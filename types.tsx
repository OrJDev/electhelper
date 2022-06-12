import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IFlows } from './types/Builder';
import { IFormType } from './types/Formulas';
import { IOptionalFields } from './types/Values';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Tabs: undefined;
  Formulas: {
    currentState: IOptionalFields;
  };
  Results: {
    formula: string;
    variables: Partial<IOptionalFields>;
    sFor: string;
    sType: IFormType;
  };
  CurrentResults: {
    formula1: string;
    formula2: string;
    count: {
      first: {
        I1: number;
        I2: number;
        eq: number;
      },
      second: {
        I1: number;
        I2: number;
        eq: number;
      }
    },
    directions: { I1: IFlows, I2: IFlows };
  }
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Settings: undefined;
  Current: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
