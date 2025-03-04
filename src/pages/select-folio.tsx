import { Container } from "react-bootstrap";
import MyNavbar from "../components/Navbar";

import Popup from "../components/select-folio-popup";

import { Dispatch,SetStateAction } from "react";
 
const SelectFolio = ({show,setShow}:{show:boolean,setShow:Dispatch<SetStateAction<boolean>>}) => {
  return (
    <>
      <MyNavbar />
      <Container className="mt-4">
        <Popup setShow={setShow} show={show} />
        {/* <SelectPaymentMethod setShow={() => {}} show={true} /> */}
        {/* {<OrderPlaces setShow={() => {}} show={true} />} */}
      </Container>
    </>
  );
};

export default SelectFolio;
