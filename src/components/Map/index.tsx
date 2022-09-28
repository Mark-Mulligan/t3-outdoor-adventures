import React, { FC } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "60vh",
};

interface IProps {
  googleMapsKey: string;
  lat: number;
  lng: number;
}

const MyComponent: FC<IProps> = ({ googleMapsKey, lat, lng }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsKey,
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={{ lat, lng }} zoom={5}>
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  ) : (
    <></>
  );
};

// export default React.memo(MyComponent);
export default MyComponent;
