// 특정 레시피 객체 받아서 랜덤으로 이미지나 매뉴얼을 리턴하는 함수
export const getRandomImageOrManualFromObject = object => {
  // get the value of the keys that has pattern of "MANUAL_IMG%d" or "MANUAL%d"
  const manualImageKeys = Object.keys(object).filter(
    key => key.includes('MANUAL_IMG') || key.includes('MANUAL')
  );
  const manualImageValues = manualImageKeys.map(key => object[key]);

  // get only nonempty string from manualImageValues
  const nonEmptyManualImageValues = manualImageValues.filter(
    value => value !== ''
  );

  return nonEmptyManualImageValues[
    Math.floor(Math.random() * nonEmptyManualImageValues.length)
  ];
};
