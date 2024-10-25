import React from 'react';
import {View, Text, Image} from '../../Polyfills';
import heart from '../../../../public/images/heart.png';

const VoteHint = () => {
  const styles = {};
  return (
    <View style={styles.wrapper}>
      <Image source={heart} />
      <Text style={styles.description}>
        Help others find and enjoy listening. Most popular tunes receive badge
        and prize.
      </Text>
      <Text style={styles.punchline}>Be the one to share and win!</Text>
    </View>
  );
};
export default VoteHint;
