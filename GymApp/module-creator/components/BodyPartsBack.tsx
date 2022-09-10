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

const BodyPartsBack = (props: any) => {

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

      const reference = ref(storage, '/images/muscles/muscles_back.png');

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
          viewBox="220 -40 340 400"
          height="100%"
          width="100%"
          style={{}}
          {...props}
        >
          <Image
            width={570}
            height={472}
            x={109.74}
            y={-79.441}
            href={{uri: url}}
            opacity={0.9}
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
            d="m312.835 98.442 6.87-.79 8.457 1.469 12.712.586 6.354 1.156 6.932 3.465 5.198 4.621 4.236 5.969 4.814 6.161 2.888 5.969.963 9.05-2.889 8.856 1.348 7.702 1.541 6.354.577 7.702 1.155 9.477.963 6.931 2.311 4.814.962 4.236-2.695 1.348-4.814-.193-8.664-1.54-7.894-1.926-8.28-1.347-4.813-2.311-5.776-4.043-4.044-3.659-5.776-2.695-4.813.192H307.372l-4.236-2.503-3.465-5.776-2.696-8.087-2.31-9.049.77-9.435 2.695-5.969 2.696-9.049 2.888-9.05 3.081-6.353 2.503-8.087z"
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
            d="m292.184 119.704-.125-8.211.747-9.454 2.612-10.823 4.105-10.325 2.364-8.46.622-7.961.871-6.469-3.608-4.105-3.981 2.861-2.612 3.856-2.612 7.464-.996 6.345-1.866 8.832-.622 5.598-.373 6.22 1.991 8.211-.747 8.459-.622 5.474z"
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
            d="m323.408 6.955-1.368-9.081v-6.842l.622-8.086-.871-4.852-5.473 8.21-2.364 8.087-4.727 12.191-.871 2.861-1.493 5.349-.373 4.728-2.364 5.473 2.364 1.244 4.976-3.856 5.225-5.971 3.732-5.35z"
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
            d="m320.665 25.351-.401 4.915-.201 4.312-1.103 2.909-6.318 5.716-3.109 2.808-4.413 4.413-2.307-2.206.702-3.611 6.92-5.215 3.611-4.313 3.009-3.61z"
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
            d="m332.755-12.438 2.987-3.251.527-3.338v-5.623l1.494-4.041 1.932-2.899 2.899-3.075 3.515-3.69 3.514-4.217 2.02-4.304-2.723.263-6.501 3.602-6.326 3.954-6.764 5.798-1.757 3.075-2.636 4.217-1.406 2.372-.527 3.25.44 2.196 1.054 2.812 4.305 2.372z"
          />
          <Path
            fill={selected === 'back' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'back' ? setSelected("") : setSelected("back");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m335.254 11.599 12.406 1.407 4.476-6.651 3.326-5.371 6.65-7.29 2.814-4.605 6.395-7.546 5.883-6.523 6.139-5.755 4.861-3.837 6.906-3.325 6.651-3.709 4.604-2.558-4.221-6.139-3.453-4.093-2.941-3.453-2.942-2.686-5.116.255h-4.093l-4.22 1.663-4.093 1.919-4.477 1.662-4.476 1.279-4.477 1.919-4.22 2.43-3.198 1.279-2.558 3.837-3.581 4.604-3.581 4.093-2.686 3.197-2.174 2.686-2.174 2.686-.256 5.116.256 4.349-.768 3.964-.383 4.86-.256 8.058-.384 6.395z"
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
            d="m396.517-66.234 1.663.384 2.43 1.023-.384 2.814 1.151 2.941 2.558 2.942 2.942 2.302 1.279 2.175 3.453 3.453 2.302 1.279 2.814 1.662 5.116 1.535 4.348 2.175-.639.895-2.558-.384-5.372-.895-5.244-1.023-4.22-1.535-3.709-3.453-3.709-5.116-2.814-3.454-3.07-3.453-1.151-2.046 1.023-2.686z"
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
            d="m447.548 32.83-.639-8.825-1.663-10.359.64-7.802V-1.19l-.896-8.698-1.279-7.162-1.79-5.244-2.43-6.395-3.326-2.941-4.22-3.965-5.372-2.686-6.651-2.046-5.627-1.279-4.349-1.151-3.837.127-7.929 4.605-6.012 2.686-5.627 3.453-4.221 4.221-7.29 6.906-4.221 5.116-1.662 1.535 1.918 3.069 7.034.512 3.966-6.267 5.755-4.477 10.871-2.941 8.569-.512 6.651 1.151 6.267 5.244 5.883 6.523 2.814 7.035L430.794.6l3.07 5.372 2.429 5.499 1.919 5.116 1.79 4.349 2.047 3.453 2.302 3.837z"
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
            d="m410.829 26.533 1.885 4.556 2.042 5.812.471 3.142-2.67 3.613-2.043 4.713-1.728 5.026-.942 4.713-.471 3.927-1.571 6.598-3.299 5.027-3.613 4.555-5.184 6.127-1.414 5.027-1.885 7.226-2.827 9.076-5.027-4.87-5.341-4.555-6.127-3.299-3.77-3.927-2.67-3.613-5.341-6.284 2.042-5.184 3.77-4.713 4.712-4.555 4.556-4.87 5.027-7.069 5.184-6.912 7.069-5.812 5.498-2.828 5.812-5.027 5.498-4.712z"
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
            d="m415.405-19.574 6.721 6.367 3.006 6.368 3.715 7.428 2.653 4.776 2.299 3.891 1.769 6.19 1.061 4.245 2.122 4.599 3.184 5.306 2.476 4.952 1.769 4.776.708 5.129 1.238 7.429.176 9.551v14.326l-.176 5.13-1.238 8.136-2.123 5.129-6.898-2.476-3.36-4.068-3.715-10.966-4.952-13.619-4.068-13.973-3.184-9.551-4.422-13.266-2.476-10.965-1.768-10.259 1.061-8.136.353-8.136 1.946-6.014z"
          />
          <Path
            fill={selected === 'lats' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'lats' ? setSelected("") : setSelected("lats");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m347.017 18.398 3.033-6.165 6.258-8.069 6.094-7.336 4.68-5.348 10.696-.334 10.027-.669h11.031l7.019 7.354-4.679 11.364-4.68 10.362-6.685 15.041-11.364 13.37-9.694 12.702-7.688 8.356-11.364-4.345-7.019-10.362-1.003-13.035 3.342-17.047z"
          />
          <Path
            fill={selected === 'lowerBack' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'lowerBack' ? setSelected("") : setSelected("lowerBack");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m332.32 27.913 8.022 1.003-2.006 8.356-.334 12.033 1.003 9.693 6.016 8.357 4.011 6.016-1.337 9.359-6.016 8.357-8.691 4.011-8.356.668-7.019-2.674-2.34-10.696 3.677-15.375 2.34-12.368 6.016-16.044z"
          />
          <Path
            fill={selected === 'lats' ? active : inactive}
            fillOpacity={0.6}
            onPressIn={() => {
              selected === 'lats' ? setSelected("") : setSelected("lats");
            }}
            onPress={() => {
              onChangeMuscle();
            }}
            stroke="#F8D8D8"
            d="m323.974-13.497 3.447 1.83 3.446.647 2.8.861.431 3.231.323 7.001-.108 4.415-.861 7.108-1.939 7.539-3.015 8.508-2.477 6.354-2.585 7.97-2.8 7.108-.108-7.754 1.077-6.57.215-6.677 1.831-7.862.539-6.462.538-4.954-.431-6.139-.646-5.169-.215-6.139z"
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
            d="m308.436 178.659 10.112-.225 10.786 1.348 6.517 5.393 9.887 5.842 10.561 6.966-1.123 6.292.224 12.359-.224 6.741-1.798 7.191-2.247 6.741-2.921 9.213-1.798 5.393-2.697 8.314-3.82 4.719-4.494 7.191-2.696 3.595-5.843-.225-6.291-2.921-2.697-6.067-3.146-6.966-.449-11.011-.899-9.213-.899-11.684-.674-11.685.225-8.764-.45-11.46-.899-10.112z"
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
            d="m312.481 264.846 4.494 6.067 5.618 5.168 7.191 2.247-.225 5.169-1.573 7.64-2.696 12.358-2.248 8.764-2.247 6.292-1.797 7.191-2.472 4.494-4.719 5.618-5.618 1.348-5.393.225-5.168-3.146-2.247-4.719-.449-10.337 1.797-13.482 3.596-8.988 2.921-7.865 5.393-9.887 3.37-7.865z"
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
            d="m419.891 249.791 4.27 3.37 4.044 4.494 3.371 4.944 3.82 5.393 1.573 7.191v9.213l-1.124 8.763-2.471 8.988-2.247 6.292-5.169 3.371-6.067 4.943-6.516-.449-4.494-6.067-2.023-9.213 1.124-12.584 5.617-15.954 2.697-8.089 2.696-9.213z"
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
            d="m349.108 191.192 6.741.225 11.685 2.921 6.068 1.573 17.976 6.292 7.191 3.595 6.741 3.371 6.292 5.617 4.494 4.719 8.764 8.09 5.168 4.044 2.696 5.393.225 4.495-.225 4.718-2.247 4.045-4.943.674-5.169-4.044-4.044-5.843-5.843-4.269-10.786-6.741-8.089-4.719-6.741-4.27-8.764-6.966-8.764-8.988-5.168-5.393-6.067-4.269z"
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
            d="m397.645 154.115 9.213 7.416 5.618 4.719 6.292 6.741 5.842 7.865 10.112 12.808 4.269 9.438 5.843 11.01 5.168 8.989-1.124 6.516-4.269 6.067h-5.618l-6.741-3.37-11.685-12.135-11.684-10.336-7.865-6.517-5.618-7.19-3.371-7.865-1.797-8.314v-8.09l.899-8.314.898-5.618z"
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
            d="m451.35 57.341 2.247 3.371 1.573 6.292 7.865 7.64 10.112 7.64 6.067 5.393 6.067 5.168 5.393 3.146 5.393 2.921 4.944 3.596-2.697 1.348-6.292-1.348-5.617-1.573-10.112-3.82-10.337-3.146-8.314-3.82-4.494-5.393-1.348-7.865-.899-9.213z"
          />
        </Svg>
      : 
        <ActivityIndicator color={theme.colors.STEP_0} size={30} />
      }
    </>
  );
};

export default BodyPartsBack;

const styles = (theme: ThemeModel) => StyleSheet.create({});
