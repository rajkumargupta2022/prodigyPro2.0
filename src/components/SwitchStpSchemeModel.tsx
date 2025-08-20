import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

import { useEffect, useState } from 'react';
import SwitchSelectionScheme from './Switch-selection-scheme';
import { filteredSchemeResponse, filteredSchemesKeys } from '../pages/data-interfaces/explore';
import { postRequest } from '../services/Api/HandleApi';
import { endPoints } from '../services/utils/urls';
import SwitchConfirmation from './SwitchConfirmation';
import { cartItemKey } from '../pages/data-interfaces/transact';
import { detailPortfolioSchemeType } from '../pages/data-interfaces/portfolio';
import { keys } from '../services/utils/keys';
import StpConfiramtion from './Stp-confirmation';
interface investmetProps {
  show: boolean;
  setShow: (show: boolean) => void;
  selectedAmcCode: number[];
  schemeList: detailPortfolioSchemeType,
  transactionType: string
}


const SwitchSchemeModel: React.FC<investmetProps> = ({ show, setShow, selectedAmcCode, schemeList, transactionType }) => {
  const [openSwitchConfirmationModel, setOpenSwitchConfirmationModel] = useState<boolean>(false)
  const [openStpConfirmation, setOpenStpConfirmation] = useState<boolean>(false)
  const [selectedSchemes, setSelectedSchemes] = useState<filteredSchemesKeys[]>([])
  const [cartItem, setCartItem] = useState<cartItemKey[]>([])
  const [filteredSchemes, setFilteredSchemes] = useState<filteredSchemesKeys[]>([])

  useEffect(() => {
    fetchFilteredScheme(1, 3)

  }, [show])

  const handleSwitch = () => {

    mergeSchemes()
    if (transactionType === keys.Switch) {
      setOpenSwitchConfirmationModel(true)
      setShow(false)
    } else {
      setOpenStpConfirmation(true)
      setShow(false)
    }


  }
  const mergeSchemes = () => {
    let cartData = [
      {
        fromScheme: schemeList.scheme,
        toScheme: selectedSchemes[0]?.PRODUCT_LONG_NAME,
        fromAccordProductCode: schemeList.accordSchemeCode.toString(),
        toAccordProductCode: selectedSchemes[0]?.PRODUCT_CODE,
        amount: 0,
        fromValue: Number(schemeList.currentvalue),
        fromUnit: Number(schemeList.unit),
        folioNumber: schemeList.folio,
        installment_units: Number(schemeList.unit),
        all_units: true
      }
    ]
    setCartItem(cartData)
  }
  const fetchFilteredScheme = async (page: number, retunrs: number) => {
    const reBody = {
      amc_code: selectedAmcCode,
      asset_code: [],
      classcode: []
    }
    try {
      const res = await postRequest<filteredSchemeResponse>(endPoints.getFilteredScheme + "?page=" + page + "&returns=" + retunrs, reBody)
      if (res.data) {
        setFilteredSchemes(res.data)
      } else {
        setFilteredSchemes([])
      }
    } catch (err) {
      setFilteredSchemes([])
    }
  }
  const handleSchemeSelection = (item: filteredSchemesKeys) => {
    setSelectedSchemes([item])
    checkIsSelected(item)
  }
  const checkIsSelected = (item: filteredSchemesKeys) => {
    return selectedSchemes.some(data => data.PRODUCT_CODE === item.PRODUCT_CODE)
  }
  return (
    <>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}

      >
        <Modal.Header closeButton className='modal-bg'>
          <Modal.Title >Select a New Fund to {transactionType}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-bg'>
          <SwitchSelectionScheme filteredSchemes={filteredSchemes} handleSchemeSelection={handleSchemeSelection} checkIsSelected={checkIsSelected} />
          <Card.Header className='scheme-bg footerRadius px-3 py-2 fs12px'>{transactionType} orders once placed cannot be cancelled.</Card.Header>

        </Modal.Body>
        <small className='fs12px modal-bg text-center'>According to SEBI guidelines, redemption payouts are processed only to the bank account registered in the folio statement.</small>
        <Modal.Footer className='modal-bg '>
          <Button className='customButton buttunCenter' onClick={handleSwitch}>{transactionType}</Button>
        </Modal.Footer>
      </Modal>
      <SwitchConfirmation show={openSwitchConfirmationModel} setShow={setOpenSwitchConfirmationModel} cartItem={cartItem} setCartItem={setCartItem} />
      <StpConfiramtion show={openStpConfirmation} setShow={setOpenStpConfirmation} cartItem={cartItem} setCartItem={setCartItem} />
    </>
  );
}

export default SwitchSchemeModel;