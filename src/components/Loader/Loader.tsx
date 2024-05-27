import { Vortex } from "react-loader-spinner";

const Loader: React.FC = () => {
  return (
    <Vortex
      visible={true}
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={["red", "pink", "lightblue", "yellow", "orange", "purple"]}
    />
  );
};
export default Loader;
