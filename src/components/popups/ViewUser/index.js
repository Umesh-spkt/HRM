import ReactModal from "react-modal";

const ViewUser = ({ open, onClose }) => {
  return (
    <ReactModal isOpen={open}>
      <div>
        <h1>View User </h1>
        <button onClick={onClose}>close modal</button>
      </div>
    </ReactModal>
  );
};
export default ViewUser;
