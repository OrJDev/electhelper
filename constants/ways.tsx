import { Text } from "react-native";
import fonts from "./fonts";
import { ISolverResults } from "../functions/math";
import { IWays } from "../types/Math";

export default (formula: string, results: [...ISolverResults, string]): IWays[] => {
    return [
        {
            f: formula,
        },
        {
            f: '',
            myMap: results[2].map((item, index) =>
                <Text style={
                    {
                        color: 'gray',
                        ...fonts.h3,
                        fontSize: 20,
                        textTransform: 'uppercase'
                    }}
                    key={index}>
                    {item}
                </Text>)
        },
        {
            f: results[1],
        },
        {
            f: `${results[0]} ${results[3]}`,
        },]
}