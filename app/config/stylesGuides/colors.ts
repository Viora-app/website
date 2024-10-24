const common = {
  backdrop: 'transparent',
  seeThroughWhite: 'rgba(255, 255, 255, 0.5)',
  seeThroughBlack: 'rgba(0, 0, 0, 0.5)',
};

const light = {
  ...common,

  neutralMighty: '#000000',
  neutralMajestic: '#252525',
  neutralStrong: '#3D3D3D',
  neutralMild: '#6D6C6C',
  neutralTender: '#B1B1B1',
  neutralPale: '#EDEDED',
  neutralZero: '#FFFFFF',

  primaryStrong: '#4E344D',
  primaryMild: '#A687AB',

  secondaryStrong: '#FEEAE3',
  secondaryMild: '#FEF2EE',

  skyTender: '#BBE1FF',

  amberTender: '#F3B173',

  warnStrong: '#F47081',
  warnMild: '#FF9DAA',

  reassureStrong: '#42BFC7',
  reassureMild: '#BDDFE1',
  reassurePale: '#E0F6F7',
  seeThroughShade: common.seeThroughWhite,
};

const dark = {
  ...common,

  neutralMighty: '#FFFFFF',
  neutralMajestic: '#E6E6E6',
  neutralStrong: '#999999',
  neutralMild: '#5D5D5D',
  neutralTender: '#323131',
  neutralPale: '#181818',
  neutralZero: '#111111',

  primaryStrong: '#825E87',
  primaryMild: '#573F5A',

  secondaryStrong: '#1E161F',
  secondaryMild: '#0B080C',

  skyTender: '#BBE1FF',

  amberTender: '#F3B173',

  warnStrong: '#F47081',
  warnMild: '#FF9DAA',

  reassureStrong: '#42BFC7',
  reassureMild: '#BDDFE1',
  reassurePale: '#E0F6F7',
  seeThroughShade: common.seeThroughBlack,
};

export default {
  light,
  dark,
};
