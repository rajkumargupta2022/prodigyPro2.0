// import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useLoader } from "../../context/LoaderContext";

const Loader = () => {
   const { loading } = useLoader();

  if (!loading) return null; 
  return (

    <div className="loader-overlay">
      <ClipLoader
        color={"#011EFE"}
        loading={loading}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>

  )
}
export default Loader