import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { endPoints } from "../services/utils/urls";
import { notesRes } from "../pages/data-interfaces/portfolio";
import { getRequest } from "../services/Api/HandleApi";

interface MsgModelProps {
  portfolioType: string
}

function PortfolioNotes({ portfolioType }: MsgModelProps) {
  const [notes, setNotes] = useState<any>("")
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    fetchNotes()
  }, [])
  useEffect(() => {
    const btn = document.getElementById("readMoreBtn");
    if (btn) btn.onclick = () => setShow(true);
  }, [notes, portfolioType]);

  const fetchNotes = async () => {
    try {
      const res = await getRequest<notesRes>(endPoints.getNotes)
      setNotes(res.data)

    } catch (err) {
      console.log(err);

    }

  }
  const handleClose = () => {
    setShow(false)
  }
  function convertToHTML(text: string):string {
    if(!text){
      return "<p></p>"
    }
    const html = text
      .replace(/\n\n+/g, '</p><p>')
      .replace(/\n/g, '<br/>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>');

    // Add Read More inside last paragraph
    return html.replace(
      /<\/p>$/,
      ' <small class="logoBlueColor crPointer" id="readMoreBtn">Read More</small></p>'
    );    // add closing </p>
  }
  function convertToHTMLLongMsg(text: string): string {
  if (!text) {
    return "<p></p>"; // ✅ string instead of JSX
  }

  const html = text
    .replace(/\n\n+/g, "</p><p>")
    .replace(/\n/g, "<br/>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>");

  return html;
}
  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: convertToHTML(notes?.[portfolioType]?.short_note) }}
      />
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {heading}
        </Modal.Title>
      </Modal.Header> */}

        <hr className="my-0" />

        <Modal.Body>
        <div
        dangerouslySetInnerHTML={{ __html: convertToHTMLLongMsg(notes?.[portfolioType]?.long_note) }}
      />
        </Modal.Body>


        <Modal.Footer>

          <button type="button" className="customButton px-4 mx-auto d-block" onClick={handleClose}>{"OK"}</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PortfolioNotes;
