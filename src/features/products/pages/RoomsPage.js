import Rooms from '../components/Rooms';

function RoomsPage({ onInquire }) {
  return (
    <div className="rooms-page">
      <main>
        <Rooms onInquire={onInquire} />
      </main>
    </div>
  );
}

export default RoomsPage;

