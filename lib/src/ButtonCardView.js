import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Androw from "react-native-androw";
import ListItem from "./components/ListItem/ListItem";

import _styles, {
  _shadowStyle,
  _container,
  _listStyle,
} from "./ButtonCardView.style";

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

const ASPECT_RATIO = ScreenWidth / ScreenHeight;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const INITIAL_REGION = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const ButtonCardView = (props) => {
  const {
    data,
    width,
    title,
    height,
    styles,
    titleStyle,
    listHeight,
    borderColor,
    shadowStyle,
    shadowColor,
    borderLeftWidth,
    backgroundColor,
    buttonContainerStyles,
    buttonsTextStyles,
    buttonStyles,
    primaryButtonText,
    secondaryButtonText,
    onPressPrimary,
    onPressSeconday,
    primaryImage,
    secondaryImage,
  } = props;

  renderListItem = (list, index) => {
    const { item } = list;
    return (
      <View key={index} style={{ marginTop: 3 }}>
        <ListItem name={item.name} source={item.source} {...props} />
      </View>
    );
  };

  renderButton = (text, onPress, imageSource) => {
    return (
      <Androw style={_styles.androwStyles}>
        <TouchableOpacity
          style={buttonStyles || _styles.buttonStyles}
          onPress={onPress}
        >
          <Text style={buttonsTextStyles || _styles.buttonsTextStyles}>
            {text}
          </Text>

          <Image source={imageSource} style={_styles.iconStyle} />
        </TouchableOpacity>
      </Androw>
    );
  };

  return (
    <Androw style={shadowStyle || _shadowStyle(shadowColor)}>
      <View
        style={
          styles ||
          _container(
            height,
            width,
            borderColor,
            borderLeftWidth,
            backgroundColor
          )
        }
      >
        <View style={_styles.listContainer}>
          <Text style={titleStyle || _styles.titleStyle}>{title}</Text>
          <View style={_styles.listContainerGlue}>
            <FlatList
              style={_listStyle(listHeight)}
              renderItem={renderListItem}
              keyExtractor={(item, index) => item.name}
              data={data && data.length > 0 && data}
            />
          </View>
        </View>
        <View style={buttonContainerStyles || _styles.buttonContainerStyles}>
          {this.renderButton(primaryButtonText, onPressPrimary, primaryImage)}
          {this.renderButton(
            secondaryButtonText,
            onPressSeconday,
            secondaryImage
          )}
        </View>
      </View>
    </Androw>
  );
};

ButtonCardView.propTypes = {
  title: PropTypes.string,
  shadowColor: PropTypes.string,
  borderColor: PropTypes.string,
  borderLeftWidth: PropTypes.number,
  backgroundColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  listHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ButtonCardView.defaultProps = {
  height: 150,
  listHeight: 85,
  shadowColor: "#ccc",
  borderLeftWidth: 5,
  markerLat: LATITUDE,
  markerLng: LONGITUDE,
  title: "Testimonial",
  borderColor: "#f54242",
  backgroundColor: "#fff",
  width: ScreenWidth * 0.9,
  mapInitialRegion: INITIAL_REGION,
};

export default ButtonCardView;
