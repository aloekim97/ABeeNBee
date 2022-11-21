import { useState } from "react";
import NewReview from "./NewReview";
import { Modal } from "../../context/Modal";

export default function LeaveRevModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
          <button onClick={() => setShowModal(true)}>Leave Review</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <NewReview />
            </Modal>
          )}
        </>
      );
}