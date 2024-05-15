import {
    View,
    Text,
    TouchableOpacity,
  } from "react-native";
import { Box } from "native-base";
import OptionCardContextStyle from "./OptionCardContextStyle";
  
const OptionCardContext = ({text, onClickFunction}) => {
    return(
    <TouchableOpacity style={OptionCardContextStyle.card} onPress={onClickFunction}>
        <Box
            overflow="hidden"
            borderWidth="1"
            rounded="lg"
            borderColor="coolGray.200"
            shadow="0.9"
            width="100%"
            height="20"
            style={OptionCardContextStyle.text}
        >
            <Text>{text}</Text>
        </Box>
    </TouchableOpacity>
    );
}
  
export default OptionCardContext;