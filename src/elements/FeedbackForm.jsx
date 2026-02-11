import { useEffect, useState ,useRef } from "react";
import { Modal } from "bootstrap";

const FeedbackForm = ({ value, setAttemps }) => {
  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [topicRelated, setTopicRelated] = useState("");

  const MAX_ATTEMPS = 1;

  useEffect(() => {
    modalInstance.current = new Modal(modalRef.current, {
      backdrop: "static", // opcional
      keyboard: true,
    });
  }, []);

  useEffect(() => {
    if (value >= MAX_ATTEMPS && modalInstance.current) {
      modalInstance.current.show();
    }
    localStorage.setItem("attemps", value);
  }, [value]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor o almacenándolos en el estado
    console.log("Question 1:", question1);
    console.log("Question 2:", question2);
    console.log("Topic Related:", topicRelated);

    // Cerrar el modal después de enviar
    if(modalInstance.current){
      modalInstance.current.hide();
    }

    localStorage.removeItem("attemps");
    setAttemps(0);
  }

  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Please provide feedback</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={e => handleSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="question1" className="form-label">Email address</label>
                <textarea className="form-control" id="question1" value={question1} onChange={(e) => setQuestion1(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="question2" className="form-label">Password</label>
                <textarea className="form-control" id="question2" value={question2} onChange={(e) => setQuestion2(e.target.value)} />
              </div>

              <div className="mb-3">
                 <label className="form-label">What topic did you make your question?</label>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="topicRelated" id="radioDefault1" onChange={() => setTopicRelated("Programming Languages")}/>
                    <label className="form-check-label" htmlFor="radioDefault1">
                        Programming Languages
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="topicRelated" id="radioDefault2" onChange={() => setTopicRelated("EDC")}/>
                    <label className="form-check-label" htmlFor="radioDefault2">
                        EDC
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="topicRelated" id="radioDefault3" onChange={() => setTopicRelated("Both")}/>
                    <label className="form-check-label" htmlFor="radioDefault3">
                        Both
                    </label>
                </div>

               </div>


              <button type="submit" className="btn btn-primary"> Submit </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
