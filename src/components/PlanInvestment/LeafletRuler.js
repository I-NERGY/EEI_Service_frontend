import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "./leaflet-ruler.css";
import "./leaflet-ruler";

export default function LeafletRuler() {
    const map = useMap();

    let times = 0

    useEffect(() => {
        if (!map) return;
        if (map && times < 1) {
            L.control.ruler().addTo(map);
            times ++
        }
    }, [map]);

    return null;
}
