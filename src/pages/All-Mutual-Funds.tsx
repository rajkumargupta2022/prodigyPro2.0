// import {  Container } from "react-bootstrap";
// import MyNavbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import Category from "./explore/Category";
// // // import Returns from "./explore/SortBy";
// import Filters from "./explore/Amcs";
// import { useEffect, useState } from "react";
// import { postRequest } from "../services/Api/HandleApi";
// import { endPoints } from "../services/utils/urls";
// import { filteredSchemeResponse, filteredSchemesKeys } from "./data-interfaces/explore";
// import SwitchSchemes from "../components/SwitchSchemes";
// import { useLocation } from "react-router-dom";


// const AllMutualFunds = () => {
//   const location = useLocation()
//   const [amcCode, setAmcCode] = useState<number[]>([])
//   const [assetCode, setAssetCode] = useState<number[]>([1])
//   const [classCode, setClassCode] = useState<number[]>([])
//   const [page, setPage] = useState<number>(1)
//   const [retunrs, setretunrs] = useState<number>(3)
//   const [filteredSchemes, setFilteredSchemes] = useState<filteredSchemesKeys[]>([])

//   useEffect(() => {
//     fetchFilteredScheme(amcCode, assetCode, classCode)
//     setPage(1)
//     setretunrs(3)
    
//   }, [])

//   const fetchFilteredScheme = async (amc: number[] = amcCode, asset: number[] = assetCode, classArr: number[] = classCode) => {
//     const reBody = {
//       amc_code: amc,
//       asset_code: asset,
//       classcode: classArr
//     }
//     try {
//       const res = await postRequest<filteredSchemeResponse>(endPoints.getFilteredScheme + "?page=" + page + "&returns=" + retunrs, reBody)
//       if (res.data) {
//         setFilteredSchemes(res.data)
//       } else {
//         setFilteredSchemes([])
//       }
//     } catch (err) {
//       setFilteredSchemes([])
//     }
//   }

//   const handleFilter = (value: number, filterType: string) => {

//     let classArr: number[];
//     let amc: number[];
//     let asset: number[];
//     switch (filterType) {
//       case "category":
//         if (classCode.includes(value)) {
//           classArr = classCode.filter(item => item !== value)
//           setClassCode(classArr);
//           fetchFilteredScheme(amcCode, assetCode, classArr)
//         } else {
//           classArr = [...classCode, value]
//           setClassCode(classArr)
//           fetchFilteredScheme(amcCode, assetCode, classArr)
//         }
//         break;
//       case "asset":
//         asset = [value]
//         setAssetCode(asset)
//         fetchFilteredScheme(amcCode, asset, classCode)
//         break;
//       case "amc":
//         amc = amcCode.filter(item => item !== value)
//         if (amcCode.includes(value)) {
//           setAmcCode(amc);
//           fetchFilteredScheme(amc, assetCode, classCode)
//         } else {
//           amc = [...amcCode, value]
//           setAmcCode(amc)
//           fetchFilteredScheme(amc, assetCode, classCode)
//         }
//         break;
//       default:
//         return;
//     }

//   }
//   const isAvailable = (value: number, type: string): boolean => {
    
//     switch (type) {
//       case "category":
//         return classCode.includes(value)

//       case "asset":
//         return assetCode.includes(value)

//       case "amc":
//         return amcCode.includes(value)

//       default:
//         return false
//     }
//   }
//   // const fundDetails = (item: filteredSchemesKeys) => {
//   //   navigate("/fund-details", { state: { accordSchemeCode: item.Schemecode, fromPortfolio: false } })
//   // }

//   return (
//     <>
//       <MyNavbar />
//       <Container className="mt-4">
//         <div className="d-md-block d-none">
//           <h4 className="fw-bold">{location.state ? location.state:"All Mutual Funds"}</h4>
//           <p>
//             Discover mutual funds across all categories using the all mutual funds
//             screener
//           </p>
//         </div>
//         <div className="row">
//           <div className="col-lg-4 border-end d-none d-lg-block">

//             {/* <Returns /> */}

//             <Category handleFilter={handleFilter} isAvailable={isAvailable} />

//             <Filters handleFilter={handleFilter} isAvailable={isAvailable} />
//           </div>
//         <SwitchSchemes handleFilter={handleFilter} isAvailable={isAvailable} filteredSchemes={filteredSchemes}/>
//         </div>

//       </Container>
//       <Footer />
//     </>
//   );
// };

// export default AllMutualFunds;

import { Container } from "react-bootstrap";  
import MyNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import Category from "./explore/Category";
import Filters from "./explore/Amcs";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";
import { assetTypeListKeys, assetTypeListResponse, categoryListKeys, categoryListResponse, filteredSchemeResponse, filteredSchemesKeys } from "./data-interfaces/explore";
import SwitchSchemes from "../components/SwitchSchemes";
import { useLocation } from "react-router-dom";

const AllMutualFunds = () => {
  const location = useLocation();
  const [amcCode, setAmcCode] = useState<number[]>([]);
  const [assetCode, setAssetCode] = useState<number[]>([1]);
  const [classCode, setClassCode] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1); // Tracks current API page
  // const [retunrs, setretunrs] = useState<number>(3);
  const [filteredSchemes, setFilteredSchemes] = useState<filteredSchemesKeys[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true); // Tracks if more pages exist
  const [fetchedPages, setFetchedPages] = useState<number[]>([]); // Tracks fetched API pages
  const [isNewFilter, setIsNewFilter] = useState<boolean>(false); // Tracks if filters have changed
const [categoryList, setCategoryList] = useState<categoryListKeys[]>([])
const [assetTypeListData, setAssetTypeListData] = useState<assetTypeListKeys[]>([])
  // Fetch data for a specific page


 const fetchCategoryList = async (data:number) => {
    try {
      const res = await getRequest<categoryListResponse>(endPoints.getCategoryTypesList+"?asset_code="+data)
      if (res.data) {
        setCategoryList(res.data)
      }
    } catch (err) {
    }
  }

  const fetchAssetTypeList = async () => {
    try {
      const res = await getRequest<assetTypeListResponse>(endPoints.getAssetTypesList)
      if (res.data) {
        setAssetTypeListData(res.data)
      }
    } catch (err) {
      // console.log(err);
    }
  }

  const fetchFilteredScheme = async (
    amc: number[] = amcCode,
    asset: number[] = assetCode,
    classArr: number[] = classCode,
    pageNum: number = page
  ) => {
    setIsLoading(true);
    const reBody = {
      amc_code: amc,
      asset_code: asset,
      classcode: classArr,
    };
    try {
      const res = await postRequest<filteredSchemeResponse>(
        `${endPoints.getFilteredScheme}?page=${pageNum}&returns=${3}&per_page=25`,
        reBody
      );
      setIsLoading(false);
      return {
        data: res.data || [],
      };
    } catch (err) {
      console.error(`Error fetching page ${pageNum}:`, err);
      setIsLoading(false);
      return { data: [] };
    }
  };

  // Fetch data for a specific page and append to filteredSchemes
  const fetchPage = async (
    pageNum: number,
    amc: number[] = amcCode,
    asset: number[] = assetCode,
    classArr: number[] = classCode,
    isNewFilter: boolean = false
  ) => {
    if (!isNewFilter && fetchedPages.includes(pageNum)) return; // Skip if page already fetched
    const { data } = await fetchFilteredScheme(amc, asset, classArr, pageNum);
    if (data.length === 0 || data.length < 25) {
      setHasMore(false); // No more data to fetch
    } else {
      setHasMore(true);
    }
    
    if (isNewFilter) {
      setFilteredSchemes(data); 
    } else {
      setFilteredSchemes((prev) => [...prev, ...data]); // Append new data
    }
    setFetchedPages((prev) => [...prev, pageNum]); // Mark page as fetched
    setPage(pageNum); // Update current API page
  };

  // Handle page change from SwitchSchemes
  const handlePageChange = async (newPage: number) => {
    if (newPage >= 1 && hasMore && !fetchedPages.includes(newPage)) {
      await fetchPage(newPage, amcCode, assetCode, classCode, false);
    }
  };

  // Initial fetch on component mount or filter change
  useEffect(() => {
    const resetAndFetch = async () => {
      let asset = location?.state?.assetCode ? location?.state?.assetCode:assetCode
      let classC = location?.state?.classCode ? location?.state?.classCode:classCode
      setAssetCode(asset)
      setClassCode(classC)
      setFilteredSchemes([]);
      setFetchedPages([]);
      setHasMore(true);
      setPage(1);
      setIsNewFilter(true);
      await fetchPage(1, amcCode, asset, classC, true); // Reset to page 1 and use current filters
      // Don't reset isNewFilter immediately - let SwitchSchemes handle it
    };
   
    resetAndFetch();
  }, [amcCode, assetCode, classCode]); // Only depend on filter changes

  useEffect(()=>{
 fetchCategoryList(assetCode[0])
    fetchAssetTypeList()
  },[])
  // Reset isNewFilter flag after a short delay to allow SwitchSchemes to detect it
  useEffect(() => {
    if (isNewFilter) {
      const timer = setTimeout(() => {
        setIsNewFilter(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isNewFilter]);

  const handleFilter = (value: number, filterType: string) => {
    let classArr: number[];
    let amc: number[];
    let asset: number[];
       console.log(value,filterType);
       
    switch (filterType) {
      case "category":
        if (classCode.includes(value)) {
          classArr = classCode.filter((item) => item !== value);
        } else {
          classArr = [...classCode, value];
        }
        setClassCode(classArr);
        break;
      case "asset":
        asset = [value];
        setClassCode([])
        fetchCategoryList(value)
        setAssetCode(asset);
        break;
      case "amc":
        if (amcCode.includes(value)) {
          amc = amcCode.filter((item) => item !== value);
        } else {
          amc = [...amcCode, value];
        }
        setAmcCode(amc);
        break;
      default:
        return;
    }
    // Note: setFilteredSchemes([]) is handled in useEffect now
  };

  const isAvailable = (value: number, type: string): boolean => {
  
    switch (type) {
      case "category":
        return classCode.includes(value);
      case "asset":
        return assetCode.includes(value);
      case "amc":
        return amcCode.includes(value);
      default:
        return false;
    }
  };

  return (
    <>
      <MyNavbar />
      <Container className="mt-4">
        <div className="d-md-block d-none">
          <h4 className="fw-bold">{location?.state?.name ||"All Mutual Funds"}</h4>
          <p>
           {location.state?.msg||"Discover mutual funds across all categories using the all mutual funds screener"}.
          </p>
        </div>
        <div className="row">
          <div className="col-lg-4 border-end d-none d-lg-block">
      
          {!location?.state?.name  &&<Category handleFilter={handleFilter} isAvailable={isAvailable} categoryList={categoryList} assetTypeListData={assetTypeListData}/>}
            <Filters handleFilter={handleFilter} isAvailable={isAvailable} />
          </div>
               
          <SwitchSchemes
            handleFilter={handleFilter}
            isAvailable={isAvailable}
            filteredSchemes={filteredSchemes || []}
            handlePageChange={handlePageChange}
            currentApiPage={page}
            hasMore={hasMore}
            isNewFilter={isNewFilter}
            key={`${amcCode.join(',')}-${assetCode.join(',')}-${classCode.join(',')}`}
            from={location?.state?.name?true:false}
            categoryList={categoryList}
            assetTypeListData={assetTypeListData}
          />
        </div>
        
     
      </Container>
      <Footer />
    </>
  );
};

export default AllMutualFunds;