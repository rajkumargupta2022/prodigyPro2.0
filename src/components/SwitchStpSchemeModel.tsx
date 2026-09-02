import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

import { useEffect, useState } from 'react';
import SwitchSelectionScheme from './Switch-selection-scheme';
import { filteredSchemeResponse, filteredSchemesKeys } from '../pages/data-interfaces/explore';
import { postRequest } from '../services/Api/HandleApi';
import { endPoints } from '../services/utils/urls';
import SwitchConfirmation from './SwitchConfirmation';
import { cartItemKey, schemeDeatilDataKeys, schemeDetailType } from '../pages/data-interfaces/transact';
import { detailPortfolioSchemeType } from '../pages/data-interfaces/portfolio';
import { keys } from '../services/utils/keys';
import StpConfiramtion from './Stp-confirmation';
import { errorToast } from '../services/utils/toast';
import { assetTypeListKeys, assetTypeListResponse } from "../pages/data-interfaces/explore";
import { getRequestSimple } from "../services/Api/HandleApi";
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
  const [selectedSchemes, setSelectedSchemes] = useState<schemeDeatilDataKeys[]>([])
  const [cartItem, setCartItem] = useState<cartItemKey[]>([])
  const [filteredSchemes, setFilteredSchemes] = useState<filteredSchemesKeys[]>([])
  const [selectedAsset, setSelectedAsset] = useState<number>(1);
  const [assetTypes, setAssetTypes] = useState<assetTypeListKeys[]>([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await getRequestSimple<assetTypeListResponse>(endPoints.getAssetTypesList);
        if (res.data && res.data.length > 0) {
          const orderMap: Record<string, number> = {
            commodity: 1,
            debt: 2,
            equity: 3,
            hybrid: 4,
          };
          const sorted = [...res.data].sort((a, b) => {
            const orderA = orderMap[a.asset_type.toLowerCase()] ?? 99;
            const orderB = orderMap[b.asset_type.toLowerCase()] ?? 99;
            return orderA - orderB;
          });
          setAssetTypes(sorted);
        } else {
          setAssetTypes([]);
        }
      } catch (err) {
        setAssetTypes([]);
      }
    };
    if (show) {
      fetchAssets();
    }
  }, [show]);

  useEffect(() => {
    if (show) {
      fetchFilteredScheme(1, 3)
    }
  }, [show, selectedAsset])

  const handleSwitch = () => {
    if (selectedSchemes.length > 0) {
      mergeSchemes()
      if (transactionType === keys.Switch) {
        setOpenSwitchConfirmationModel(true)
        setShow(false)
      } else {
        setOpenStpConfirmation(true)
        setShow(false)
      }
    } else {
      errorToast("Please select scheme...")
    }



  }
  const mergeSchemes = () => {
    let cartData = [
      {
        fromScheme: schemeList.scheme,
        toScheme: selectedSchemes[0]?.scheme,
        fromAccordProductCode: schemeList.accordSchemeCode.toString(),
        stpDateList: selectedSchemes[0]?.stpDateList,
        stpFrequency: selectedSchemes[0].stpFrequency,
        fromAccordAMCCode: schemeList.accordAMCCode,
        toAccordAMCCode: selectedSchemes[0].accordAMCCode,
        frequency: "",
        unit:Number(schemeList.unit),
        toAccordProductCode: selectedSchemes[0]?.accordSchemeCode,
        amount: 0,
        fromValue: Number(schemeList.currentvalue),
        fromUnit: Number(schemeList.unit),
        folioNumber: schemeList.folio,
        installment_units: Number(schemeList.unit),
        from_date: "",
        all_units: true
      }
    ]
    setCartItem(cartData)
  }
  const fetchFilteredScheme = async (page: number, retunrs: number) => {
    const reBody = {
      amc_code: selectedAmcCode,
      asset_code: [selectedAsset],
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

    checkIsSelected(item)
    fetchSchemeDetail(item.accordSchemeCode)
  }
  const fetchSchemeDetail = async (data: number | string = "") => {
    try {
      const res = await postRequest<schemeDetailType>(endPoints.getSchemeDetails, { productcode: data })
      setSelectedSchemes(res.data)

    } catch (err) {
      setSelectedSchemes([])

    }
  }
  const checkIsSelected = (item: filteredSchemesKeys) => {
    return selectedSchemes.some(data => data.accordSchemeCode === item.accordSchemeCode)
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
          <div className="px-3 pt-2">
            <p className="fs14px text-muted mb-2">Select a category to find the right target scheme.</p>
            <div className="d-flex overflow-auto mb-3 pb-2" style={{ gap: "8px" }}>
              {assetTypes.map((asset) => {
                const isActive = selectedAsset === asset.asset_code;
                return (
                  <button
                    key={asset.asset_code}
                    className={`stp-category-pill ${isActive ? "active" : ""}`}
                    onClick={() => setSelectedAsset(asset.asset_code)}
                  >
                    {asset.asset_type}
                  </button>
                );
              })}
            </div>
          </div>
          <SwitchSelectionScheme filteredSchemes={filteredSchemes} handleSchemeSelection={handleSchemeSelection} checkIsSelected={checkIsSelected} />
          <Card.Header className='scheme-bg footerRadius px-3 py-2 fs12px'>{transactionType} orders once placed cannot be cancelled.</Card.Header>

        </Modal.Body>
        <small className='fs12px modal-bg text-center px-4'>According to SEBI guidelines, redemption payouts are processed only to the bank account registered in the folio statement.</small>
        <Modal.Footer className='modal-bg '>
          <Button className='customButton buttunCenter' onClick={handleSwitch}>Confirm Fund</Button>
        </Modal.Footer>
      </Modal>
      <SwitchConfirmation show={openSwitchConfirmationModel} setShow={setOpenSwitchConfirmationModel} cartItem={cartItem} setCartItem={setCartItem} />
      <StpConfiramtion show={openStpConfirmation} setShow={setOpenStpConfirmation} cartItem={cartItem} setCartItem={setCartItem} />
    </>
  );
}

export default SwitchSchemeModel;