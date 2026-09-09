function SuccessToast({ onDismiss }) {
  return <div className="success-toast" role="status"><span>✓</span><div><b>Inquiry sent</b><small>We’ll be in touch soon. Thank you!</small></div><button onClick={onDismiss} aria-label="Dismiss">×</button></div>;
}

export default SuccessToast;
