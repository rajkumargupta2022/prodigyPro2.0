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
import { postRequest } from "../services/Api/HandleApi";
import { endPoints } from "../services/utils/urls";
import { filteredSchemeResponse, filteredSchemesKeys } from "./data-interfaces/explore";
import SwitchSchemes from "../components/SwitchSchemes";
import { useLocation } from "react-router-dom";

const AllMutualFunds = () => {
  const location = useLocation();
  const [amcCode, setAmcCode] = useState<number[]>([]);
  const [assetCode, setAssetCode] = useState<number[]>([1]);
  const [classCode, setClassCode] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1); // Tracks current API page
  const [retunrs, setretunrs] = useState<number>(3);
  const [filteredSchemes, setFilteredSchemes] = useState<filteredSchemesKeys[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true); // Tracks if more pages exist
  const [fetchedPages, setFetchedPages] = useState<number[]>([]); // Tracks fetched API pages

  // Fetch data for a specific page
  const fetchFilteredScheme = async (
    amc: number[] = amcCode,
    asset: number[] = assetCode,
    classArr: number[] = classCode,
    pageNum: number = page
  ) => {
    setIsLoading(true);
    setError(null);
    const reBody = {
      amc_code: amc,
      asset_code: asset,
      classcode: classArr,
    };
    try {
      const res = await postRequest<filteredSchemeResponse>(
        `${endPoints.getFilteredScheme}?page=${pageNum}&returns=${retunrs}&per_page=25`,
        reBody
      );
      setIsLoading(false);
      return {
        data: res.data || [],
      };
    } catch (err) {
      console.error(`Error fetching page ${pageNum}:`, err);
      setIsLoading(false);
      setError("Failed to fetch mutual funds. Please try again.");
      return { data: [] };
    }
  };

  // Fetch data for a specific page and append to filteredSchemes
  const fetchPage = async (
    pageNum: number,
    amc: number[] = amcCode,
    asset: number[] = assetCode,
    classArr: number[] = classCode
  ) => {
    if (fetchedPages.includes(pageNum)) return; // Skip if page already fetched
    const { data } = await fetchFilteredScheme(amc, asset, classArr, pageNum);
    if (data.length === 0 || data.length < 25) {
      setHasMore(false); // No more data to fetch
    } else {
      setHasMore(true);
    }
    setFilteredSchemes((prev) => [...prev, ...data]); // Append new data
    setFetchedPages((prev) => [...prev, pageNum]); // Mark page as fetched
    setPage(pageNum); // Update current API page
  };

  // Handle page change from SwitchSchemes
  const handlePageChange = async (newPage: number) => {
    if (newPage >= 1 && hasMore && !fetchedPages.includes(newPage)) {
      await fetchPage(newPage);
    }
  };

  // Initial fetch on component mount or filter change
  useEffect(() => {
    setFilteredSchemes([]); // Clear previous data
    setFetchedPages([]); // Reset fetched pages
    setPage(1); // Reset to first page
    setretunrs(3);
    setHasMore(true);
    fetchPage(1, amcCode, assetCode, classCode);
  }, [amcCode, assetCode, classCode]);

  const handleFilter = (value: number, filterType: string) => {
    let classArr: number[];
    let amc: number[];
    let asset: number[];
    switch (filterType) {
      case "category":
        if (classCode.includes(value)) {
          classArr = classCode.filter((item) => item !== value);
          setClassCode(classArr);
        } else {
          classArr = [...classCode, value];
          setClassCode(classArr);
        }
        break;
      case "asset":
        asset = [value];
        setAssetCode(asset);
        break;
      case "amc":
        amc = amcCode.includes(value)
          ? amcCode.filter((item) => item !== value)
          : [...amcCode, value];
        setAmcCode(amc);
        break;
      default:
        return;
    }
    setFilteredSchemes([]); // Clear schemes before fetching new data
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
          <h4 className="fw-bold">{location.state ? location.state : "All Mutual Funds"}</h4>
          <p>
            Discover mutual funds across all categories using the all mutual funds
            screener
          </p>
        </div>
        <div className="row">
          <div className="col-lg-4 border-end d-none d-lg-block">
            <Category handleFilter={handleFilter} isAvailable={isAvailable} />
            <Filters handleFilter={handleFilter} isAvailable={isAvailable} />
          </div>
          <SwitchSchemes
            handleFilter={handleFilter}
            isAvailable={isAvailable}
            filteredSchemes={filteredSchemes}
            handlePageChange={handlePageChange}
            currentApiPage={page}
            hasMore={hasMore}
          />
        </div>
        {isLoading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Loading mutual funds...</p>
          </div>
        )}
     
      </Container>
      <Footer />
    </>
  );
};

export default AllMutualFunds;
