import React from 'react';
import styled from 'styled-components/native';
import {puzzleSetState} from '../atom/shared';
import {numberToName} from '../utils/numberToName';
import {useRecoilState} from 'recoil';
import {nameToNumber} from '../utils/nameToNumber';
import {patternA} from '../utils/patternA';

const GameBackground = styled.TouchableOpacity`
  flex: 1;
  background-color: ${(props: {name: string; theme: {[key: string]: string}}) =>
    props.theme[props.name]};
`;

const GamePage = ({index}: {index: number}) => {
  const [puzzleSet, setPuzzleSet] = useRecoilState(puzzleSetState);

  const pageName = numberToName(
    puzzleSet[numberToName(index) as keyof typeof puzzleSet],
  );

  const onScreenPress = () => {
    const values = Object.values(puzzleSet);
    const prevIndex = index === 0 ? values.length - 1 : index - 1;
    const nextIndex = index === values.length - 1 ? 0 : index + 1;

    const newPuzzleSet = patternA(values, prevIndex, index, nextIndex);

    setPuzzleSet({...puzzleSet, ...newPuzzleSet});
  };

  return <GameBackground onPress={onScreenPress} name={pageName} />;
};

export default GamePage;
