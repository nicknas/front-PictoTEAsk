import React from 'react'
import {InputGroup, InputGroupAddon, InputGroupText, Input, Button} from 'reactstrap';
import {FaSearch} from 'react-icons/fa'

class SearchPictogram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isSearched: false, searchValue: ''}
    }
    onSearchClick() {
        this.setState({isSearched: !this.state.isSearched});
        let listElements = [];
        for (let i = 0; i < this.state.searchValue.length; i++) {
            listElements.push("logo512.png");
        }
        this.props.images(listElements);
    }
    updateSearchValue(e) {
        this.setState({searchValue: e.target.value});
    }
    render() {
        return (
            <InputGroup>
                <Input value={this.state.searchValue} onChange={this.updateSearchValue.bind(this)} placeholder="search for a pictogram" />
                <InputGroupAddon addonType="prepend"><Button onClick={this.onSearchClick.bind(this)} color="primary"><FaSearch/></Button></InputGroupAddon>
            </InputGroup>
        );
    }
}

export default SearchPictogram;