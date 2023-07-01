import React from 'react';
import {View} from "react-native";
import InputGroup from "../InputGroup";

const Form = ({formList, state, dispatch}) => {
    return (
        <View>
            {
                formList.map((item, index) => {
                    return (
                        <InputGroup
                            placeholder={item.placeholder}
                            onChange={text => dispatch({type: item.actionType, payload: text})}
                            key={index}
                        />
                    )
                })
            }
        </View>
    );
};

export default Form;