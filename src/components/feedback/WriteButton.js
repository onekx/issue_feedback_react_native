import React from 'react'
import { Fab, Icon } from 'native-base'

const WriteButton = ({navigation}) => {
    return (
        <Fab
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => navigation.navigate('submitFeedback')}
        >
            <Icon type="FontAwesome" name="pencil" />
        </Fab>
    )
}

export default WriteButton
