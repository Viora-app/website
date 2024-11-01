import React, {FC} from 'react';

import {H4, View, Image, Link} from '../Polyfills';
import { Button, ButtonThemes } from '../Elements';
import {Routes} from '../../config/routes';
import {ScreenNotFoundProps} from './types';
import cactus from '../../../public/images/not-found.svg';

const ScreenNotFound: FC<ScreenNotFoundProps> = ({redirectTo}) => {
  const screen:Routes = (redirectTo && redirectTo in Routes) ? redirectTo : Routes.Home;

  return (
    <View className="w-full h-full flex flex-row justify-center items-center">
      <View className="flex flex-col justify-center items-center">
        <Image alt="Not Found" source={cactus} width={60} />
        <H4 className="mb-6 mt-4 text-neutralMighty">That&apos;s gone!</H4>

        {redirectTo !== false && (
          <Link to={{screen}} markActive={false}>
            <Button
              title="Back to home"
              theme={ButtonThemes.primary}
            />
          </Link>
        )}
      </View>
    </View>
  );
};
export default ScreenNotFound;
