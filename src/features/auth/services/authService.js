import { supabase } from '../../../lib/supabaseClient';

const SESSION_STORAGE_KEY = 'carmelink_staff_user';

export function getCurrentStaffUser() {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveStaffSession(user) {
  try {
    if (user) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  } catch (err) {
    console.error('Failed to update session in storage:', err);
  }
}

export async function staffSignIn(email, password) {
  if (!email || !password) {
    throw new Error('Please enter both your email address and password.');
  }

  const cleanEmail = email.trim().toLowerCase();

  // 1. Authenticate with Supabase Auth (Live Backend)
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: cleanEmail,
    password,
  });

  if (authError || !authData?.user) {
    throw new Error(authError?.message || 'Invalid credentials');
  }

  // 2. Fetch server-controlled role from public.profiles
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authData.user.id)
    .single();

  if (profileError || !profile) {
    console.error('Supabase public.profiles lookup error:', profileError);

    // Fallback: Check user_metadata in auth.users (in case role was configured during user creation)
    const userMeta = authData.user.user_metadata || {};
    const metaRole = userMeta.role;

    if (metaRole === 'owner' || metaRole === 'caretaker') {
      const fallbackProfile = {
        id: authData.user.id,
        full_name: userMeta.full_name || userMeta.name || cleanEmail.split('@')[0],
        phone: userMeta.phone || '',
        role: metaRole,
        created_at: authData.user.created_at || new Date().toISOString(),
      };
      saveStaffSession(fallbackProfile);
      return fallbackProfile;
    }

    await supabase.auth.signOut();
    const reason = profileError?.message ? ` (${profileError.message})` : '';
    throw new Error(
      `User profile not found in public.profiles table${reason}. Please ensure this user has a matching record in public.profiles with role = 'owner' or 'caretaker'.`
    );
  }

  // 3. Enforce Staff Role Guard (Owner & Caretaker only)
  if (profile.role !== 'owner' && profile.role !== 'caretaker') {
    await supabase.auth.signOut();
    saveStaffSession(null);
    throw new Error('Access denied. This dashboard is strictly for Owner and Caretaker accounts.');
  }

  saveStaffSession(profile);
  return profile;
}

export async function staffSignOut() {
  saveStaffSession(null);
  try {
    await supabase.auth.signOut();
  } catch {
    // Ignore signOut network errors
  }
}
