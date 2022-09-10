/**
 * SVG interaktywnego widoku, eventy wybierania partii ciała
 */

import { StyleSheet, ActivityIndicator } from "react-native";
import Svg, { Image, Path } from "react-native-svg";
import { useDispatch } from "react-redux";
import { ThemeModel } from "../../theme/models/ThemeModel";
import { changeMuscle } from "../redux/MusclesReducer";
import { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/Init';
import useTheme from "../../theme/hooks/useTheme";

const BodyPartsFront = (props: any) => {
  
  const inactive: string = "#F8D8D8";
  const active: string = "#9988FF";
  const [selected, setSelected] = useState<string>('');

  /**
   * motyw
   */
  const theme = useTheme();

  /**
   * link do obrazka przechowywanego w Firebase
   */
  const [url, setUrl] = useState(null);
  const [urlLoaded, setUrlLoaded] = useState(false);

  /**
  * załadowanie obrazka ze Storage w Firebase
  */
  useEffect(() => {
    const load = async () => {
      setUrlLoaded(false)

      const reference = ref(storage, '/images/muscles/muscles_front.png');

      await getDownloadURL(reference).then((res) => {
        setUrl(res);
        setUrlLoaded(true);
      })
    }
    if (url === null) load();
  }, []);

  /**
   * dispatch z reducera
   */
  const dispatch = useDispatch();

  /**
   * zaktualizowanie wybranej partii mięśniowej
   */
  const onChangeMuscle = () => {
    dispatch(changeMuscle({muscle: selected}));
  }

  return (
    <>
      {urlLoaded ?
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-60 -40 340 400"
          height="100%"
          width="100%"
          {...props}
        >
          <Image
            width={570}
            height={472}
            x={-156.248}
            y={-83.045}
            href={{uri: url}}
            opacity={0.9}
          />

          <Path
            fill={selected === 'delts' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'delts' ? setSelected("") : setSelected("delts");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m35.764-5.612 8.44-16.906 19.24-15.387 12.687-3.46 15.57 5.19 10.719 6.589-16.18 10.142L72.094-5.035l-17.3 13.263-12.11 10.957-7.497-3.46V5.345z"
          />

          <Path
            fill={selected === 'triceps' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'triceps' ? setSelected("") : setSelected("triceps");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m33.073 2.885.574 8.897-.574 7.463-5.166 8.036-6.027 8.61-9.185 9.759-4.592 7.462-5.166 5.167 3.157-7.463 6.601-12.915 7.463-12.916 7.175-13.777z"
          />

          <Path
            fill={selected === 'biceps' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'biceps' ? setSelected("") : setSelected("biceps");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m66.08 2.024-2.87 9.471-3.731 11.194-5.453 9.471-7.75 11.481-6.601 9.471-8.611 9.472-4.879-.574-.287-10.046 6.601-12.915 5.454-11.481 2.009-5.166 9.471-8.611 10.333-8.323z"
          />

          <Path
            fill={selected === 'traps' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'traps' ? setSelected("") : setSelected("traps");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m103.966-51.393 3.445 2.296-1.435 5.453-3.445 5.166-2.583 3.731-4.879-.287-9.472-4.305-5.453-2.009.287-2.583 9.472-2.583 8.323-1.435z"
          />

          <Path
            fill={selected === 'pecs' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'pecs' ? setSelected("") : setSelected("pecs");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="M105.976-29.293 93.06-21.831l-11.481 9.185-3.119 11.35-4.416 10.601 1.187 7.867 7.495 5.801 9.158 6.358 13.796 12.323 8.906 1.955 7.175-4.879 7.176-9.185 5.166-10.906 1.435-12.916-1.148-17.221-4.305-7.463-8.611-5.166z"
          />

          <Path
            fill={selected === 'pecs' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'pecs' ? setSelected("") : setSelected("pecs");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m147.593-19.248 7.175.287 3.452 4.299 6.021 9.19 3.517 6.962.787 7.677-2.009 10.907-4.879 10.045-4.879 9.472-9.185 6.888-4.305-15.499-2.583-16.073-.287-16.934-.287-10.906 3.157-4.306z"
          />

          <Path
            fill={selected === 'oblique' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'oblique' ? setSelected("") : setSelected("oblique");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m59.479 30.821 8.272-5.174 12.19 1.86 14.893 8.459 11.449 11.097-.017 12.528-1.687 30.059-1.646 24.745-6.026 7.509-8.604-2.14-13.281-14.596-10.804-10.317-2.156-15.811.287-11.194-1.148-13.49-1.435-12.054-1.435-4.593z"
          />

          <Path
            fill={selected === 'delts' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'delts' ? setSelected("") : setSelected("delts");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m158.787-21.895 7.462 5.454 4.305 5.166 5.167 8.611 1.435 8.61.287 6.601-3.731-5.74-3.23-4.59-3.514-5.455-3.834-6.364-4.655-7.413z"
          />

          <Path
            fill={selected === 'biceps' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'biceps' ? setSelected("") : setSelected("biceps");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m178.591 17.14.287 10.045 1.148 7.75 4.305 11.193 3.444 9.472 4.019 9.471 2.583 4.019-1.736 4.833-5.263.701-6.029-2.502-5.707-4.687c-3.68-2.255-6.484-3.828-6.891-11.035l.214-12.12 2.658-8.679 3.566-11.941 3.402-6.52z"
          />

          <Path
            fill={selected === 'triceps' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'triceps' ? setSelected("") : setSelected("triceps");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m156.031 42.419 2.262-.399 3.06 5.055 2.527 6.785 3.326 6.652 3.06 5.322 2.262 2.395 1.064 4.656 1.065 4.923-.4 4.656-3.592-6.519-3.725-8.648-2.394-6.252-3.859-6.786-2.394-5.986-1.73-3.725z"
          />

          <Path
            fill={selected === 'forearms' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'forearms' ? setSelected("") : setSelected("forearms");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m197.491 82.255 7.26.093 12.113 16.351 5.788 8.419 7.368 6.052-.527 3.157-9.998-4.21-11.314-5.525-8.419-6.052-6.435-8.466.898-6.144z"
          />

          <Path
            fill={selected === 'forearms' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'forearms' ? setSelected("") : setSelected("forearms");
            }}
            onPress={() => {
              onChangeMuscle();
            }}     
            stroke="#F8D8D8"
            d="m7.426 113.959 6.314-11.051 5-7.893 2.368-7.893.789-13.156 2.894-9.735-1.842-7.367-2.368-4.473 1.842-7.368 1.579-7.63-6.841 7.894-6.578 6.051-3.947 5.789-5.525 6.841-.526 5.788-1.316 8.42-1.052 7.63-.79 6.841-.263 6.841-.263 5.525v6.841l1.842 4.999 5.525.263 3.158-3.157z"
          />

          <Path
            fill={selected === 'glutes' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'glutes' ? setSelected("") : setSelected("glutes");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m55.312 112.907 2.632 12.629-3.704 10.646-2.314 7.831-2.665 12.57-4.999 7.105-2.105 9.472-1.053-16.05 2.631-12.103 3.684-13.419 3.684-9.472z"
          />

          <Path
            fill={selected === 'quads' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'quads' ? setSelected("") : setSelected("quads");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m81.765 145.286 6.161-7.354 7.577 8.419 4.442 10.525.261 6.315-7.055 8.945-1.568 7.894.261 11.314v10.261l.127 9.029-.343 6.727-.045 21.08c-.118 5.939-.087 6.852-1.305 10.524l-2.876 7.894c-1.269 3.455-1.448 3.571-3.217 6.466l-4.36 6.163c-1.777 1.556-3.117-.422-3.135-1.841l-6.556-4.598s-6.456-2.308-8.406-1.75l-8.294.822c-2.374.651-2.663-2.51-2.733-7.104l-.402-6.156-1.919-11.034c-.732-6.407 1.044-12.574 1.828-19.313l.442-13.961 5.749-16.787 4.759-24.47 3.838-12.209 3.769-10.801z"
          />

          <Path
            fill={selected === 'quads' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'quads' ? setSelected("") : setSelected("quads");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m132.405 152.666 2.368 4.999 5.525 4.999 5.525 6.841 6.841 13.419.527 9.209-1.316 10.788 2.631 11.84 2.368 16.05 6.315 14.208 4.999 11.84 6.841 6.578 3.9-4.313 5.309-.686 1.842-11.577-3.158-10.262-1.315-10.787-3.947-12.367-6.315-16.839-5.262-10.261-6.052-9.209-5.525-8.42-3.42-7.893-5.526-7.631-8.946-14.997-4.209 14.471z"
          />

          <Path
            fill={selected === 'calves' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'calves' ? setSelected("") : setSelected("calves");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="M39.651 340.176c1.099-3.721 4.347-12.686 4.347-12.686l3.158-16.839 3.157-8.42 1.842-7.104c1.564-5.617 2.097-9-1.271-13.627-1.841-2.853-3.581-5.257-5.016-6.261-1.192-.834-3.664-2.707-5.774-.539l-6.633 7.631c-2.799 3.037-4.605 6.738-5.776 10.428l-2.328 8.822c-.985 3.942-1.1 5.889-1.161 8.572l-.194 7.865-.263 9.472-.004 13.945c.179 1.261-.037 6.131.789 6.841 5.082 2.162 10.321-.153 11.419-1.48 2.445-2.502 2.507-2.549 3.708-6.62z"
          />

          <Path
            fill={selected === 'calves' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'calves' ? setSelected("") : setSelected("calves");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m139.509 319.86-.79-6.578.263-10.525 1.579-7.104 3.684-9.998 5.262-12.892 7.63-1.053 10.525 2.368 5.262 4.736.526 8.946-2.105 12.629-5.788 9.999-6.052 8.419-7.104 6.052-5.262 4.473-4.736-.789-2.894-8.683z"
          />

          <Path
            fill={selected === 'hams' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'hams' ? setSelected("") : setSelected("hams");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m103.199 190.584 11.051.789 10.787-1.316 7.631-2.105 9.735 3.947 7.104 7.63 2.368 10.262 1.842 15.26 5.262 16.05 5.525 13.682 2.895 10.788-2.368 5.788-13.156.263-3.684-14.734-12.103-14.997-9.735-12.104-8.157-17.102-7.893-11.314z"
          />

          <Path
            fill={selected === 'upperAbs' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'upperAbs' ? setSelected("") : setSelected("upperAbs");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m109.707 114.937 11.356-2.245 5.87 4.677 8.271-1.899 3.746-10.663-1.403-6.441 2.271-12.151 4.452-10.059 1.875-11.467-1.422-11.481-4.305-8.323-16.934-1.148-11.194 8.897-2.87 15.786-2.009 16.647v13.49l2.296 16.38z"
          />

          <Path
            fill={selected === 'lowerAbs' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'lowerAbs' ? setSelected("") : setSelected("lowerAbs");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m111.423 117.847 9.586-2.396 3.502 4.24 3.319.921 3.687-2.765 3.133.553-.737 5.346-1.659 8.849-1.475 7.005-1.843 9.401v7.927l-.307 4.916-5.224-2.734-3.44-1.506-3.549.278-3.626 2.35-4.501 2.78.369-9.586.737-8.48 1.106-7.927v-9.033z"
          />

        </Svg>
      : 
        <ActivityIndicator color={theme.colors.STEP_0} size={30} />
      }
    </>
  );
};

export default BodyPartsFront;

const styles = (theme: ThemeModel) => StyleSheet.create({});
