import { Oval } from "react-loader-spinner";

const Loading = ({ height = 80, width = 80, color = "#3abe49" }) => {
  return (
    <Oval
      height={height}
      width={width}
      color={color}
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor={color}
      strokeWidth={3}
      strokeWidthSecondary={3}
    />
  );
};

export default Loading;
