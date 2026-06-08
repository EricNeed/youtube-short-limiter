import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mainStyle } from '../../components/scheme_style';
import { getSymbolConfigured } from '../../components/symbol_cache';
import { createTrackGroup, trackingGroups } from '../../utils/settings/tracked_apps';

export default function HomeScreen() {

  const [refreshListener, doARefresh] = useState(false);

  const displayGroup = ({item, index}) => {
    console.log("displaying group " + index);
    return <View style={[mainStyle.switch_container, {padding: 5, backgroundColor: '#222222', margin: 6, borderTopLeftRadius:!index?15:0, borderTopRightRadius:!index?15:0}]}>
      <Text style={[mainStyle.text, {fontSize: mainStyle.text.fontSize * 2}]}>{item.name}</Text>
      <IconButton icon={({color}) => (getSymbolConfigured("edit", color))} onPress={()=>router.push(`../(modals)/configure_limit_group?groupID=${index}`)}/>
    </View>
  }

  return (
    <SafeAreaView style={mainStyle.container}>

      <Text style={mainStyle.text}>Welcome to the Home Tab!</Text>
      <View style={{borderWidth: 3, borderColor: mainStyle.borderColor, flex: 1, width:'95%', margin: 5, borderRadius: 20}}>
        <FlatList
          data={trackingGroups}
          renderItem={displayGroup}
          style={{width: '100%'}}
        />

      </View>
      <View style={{flex: 2}}>

        <Button mode='elevated' 
          icon={({color}) => getSymbolConfigured("add", color)}
          onPress={() => {
            const groupID = createTrackGroup();
            router.push(`../(modals)/configure_limit_group?groupID=${groupID}`)
            doARefresh(!refreshListener);
          }}
        > Add New Group </Button>

        <View>
          <TextInput
            dense={true}
            style={{backgroundColor: '#00000000'}}

          />
        </View>
        
        
      </View>
    </SafeAreaView>
  );
}

{/* <Button mode='elevated' onPress={() => router.push('../(modals)/configure_limit_group?groupID=0')}> Edit </Button> */}