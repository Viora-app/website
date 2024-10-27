import React, {FC} from 'react';
import {Text, View, Image} from '../Polyfills';
import {useRouter} from 'next/navigation';

import {ButtonThemes} from '../Elements/Button/types';
import {Button} from '../Elements';
import {Routes} from '../../config/routes';
import {ScreenNotFoundProps} from './types';
import cactus from '../../../public/images/cactus.png';

const ScreenNotFound: FC<ScreenNotFoundProps> = ({redirectTo}) => {
  const {push: navigate} = useRouter();

  const goHome = () => {
    if (redirectTo && redirectTo in Routes) {
      navigate(Routes[redirectTo] as never);
    }
  };

  return (
    <View>
      <Image alt="" source={cactus}/>
      <Text>Uh-oh!</Text>
      <Text>We could not find it</Text>
      {redirectTo && (
        <View>
          <Button
            title="Back to home"
            theme={ButtonThemes.primary}
            onPress={goHome}
          />
        </View>
      )}
    </View>
  );
};
export default ScreenNotFound;
