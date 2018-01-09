/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    Image,
    StyleSheet,
    ScrollView,
    View,
    TouchableWithoutFeedback,
    ListView,
    Text
} from 'react-native';
import {connect} from "react-redux"
var dataBlob = {},
    sectionIDs = [],
    rowIDs = []
import Loading from '../../common/loading'
import {cartoonList} from '../../actions/cartoon'

class Cartoon extends Component {
    constructor(props){
        super(props);
        var _getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID]
        }
        var _getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ':' + rowID]
        }
        const ds = new ListView.DataSource({
            getSectionData: _getSectionData,
            getRowData: _getRowData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        })
        this.state = {
            isFreshing: false,
            dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
            data: [
            ]
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
    }
    static navigationOptions = ({navigation}) => {
        return ({
            header: null
        })
    }
    componentWillReceiveProps = (nextProps, nextState) => {
        // console.log(nextProps.cartoon)
        if(nextProps.cartoon.status != this.props.cartoon.status && nextProps.cartoon.status === 'FETCH_CARTOON_DATA_SUCCESS'){
            this.setState({
                isFreshing: false
            })
            if (nextProps.cartoon.data && nextProps.cartoon.data.length > 0) {
                for (let v of nextProps.cartoon.data) {
                    const array = v.groupKey.split(';')
                    v.dateTitle = array[0]
                    v.title = array[1]
                }
            }
            // console.log(JSON.stringify(nextProps.cartoon.data))
            this.loadListViewDataFormJson(nextProps.cartoon.data)
            return false
        }

        if (nextProps.cartoon.status != this.props.cartoon.status && nextProps.cartoon.status === 'FETCH_CARTOON_DATA_LOADING') {
            this.setState({
                isFreshing: true
            })
            return false
        } else {
            this.setState({
                isFreshing: false
            })
            return false
        }

        return true
    }

    loadListViewDataFormJson = (data) => {
        let jsonData = data
        dataBlob = []
        sectionIDs = []
        rowIDs = []
        for (let i in jsonData) {
            sectionIDs.push(i)
            dataBlob[i] = {
                dateTitle: jsonData[i].dateTitle,
                title: jsonData[i].title,
                // iconUrl: jsonData[i].iconUrl
            }
            rowIDs[i] = []
            let listData = jsonData[i].listData
            for (let j in listData) {
                rowIDs[i].push(j)
                dataBlob[i+':'+j] = listData[j]
            }
        }

        this.setState(
            {
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs)
            }
        )
    }

    onItemClick = (rowData) => {
        const Navigation = this.props.navigation
        Navigation.navigate('CartoonDetail', {data: {
            id: rowData.id
        }})
    }

    componentDidMount = () => {
        this.props.dispatch(cartoonList())
    }

    renderRow = (rowData) => {
        return (
            <View style={{height: 895}}>
                <TouchableWithoutFeedback onPress={this.onItemClick.bind(this, rowData)}>
                    <View style={styles.rowView}>
                        <Image style={styles.rowImageView} source={{url: rowData.imageUrl}}>
                            <Text style={styles.rowSubhead}>{rowData.subhead}</Text>
                            <Text style={styles.rowTitle}>{rowData.title}</Text>
                            <Text style={styles.rowDuration}>{rowData.duration}</Text>
                            {/*<Image style={styles.rowPlay} source={require('../../images/icon_play.png')}/>*/}
                        </Image>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    renderSectionHeader = (sectionData,sectionId) => {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionDateTitle}>{sectionData.dateTitle}</Text>
                <Text style={styles.sectionTitle}>{sectionData.title}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Loading size={'large'} visible={this.state.isFreshing}/>
                <ListView
                    style={{marginTop: 40}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderSectionHeader={this.renderSectionHeader.bind(this)}
                    stickySectionHeadersEnabled={false}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    sectionHeader: {
        height: 184,
        flexDirection:'column',
        backgroundColor: '#ffffff'
    },
    sectionDateTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 50,
        marginLeft: 35,
        color: '#999999'
    },
    sectionTitle: {
        fontSize: 60,
        fontWeight: 'bold',
        marginTop: 28,
        marginLeft: 35
    },
    sectionAvatar: {
        height: 60,
        width: 60,
        borderRadius: 30,
        position: 'absolute',
        right: 35,
        top: 85
    },
    rowView: {
        height: 835,
        marginTop: 25,
        marginLeft: 35,
        marginRight: 35,
        width: 680,
        borderRadius: 30,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8
    },
    rowImageView: {
        height: 835,
        width: 680,
        borderRadius: 30
    },
    rowSubhead: {
        fontSize: 28,
        marginLeft: 36,
        marginTop: 30,
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    rowTitle: {
        fontSize: 48,
        marginLeft: 36,
        marginTop: 20,
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        fontWeight: '900'
    },
    rowDuration: {
        fontSize: 28,
        marginLeft: 36,
        marginTop: 21,
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    rowPlay: {
        width: 128,
        height: 128,
        alignSelf: 'center',
        marginTop: 184
    }
})

function mapStateToProps(state) {
    const { cartoon } = state
    return {
        cartoon
    }
}

export default connect(mapStateToProps)(Cartoon)



