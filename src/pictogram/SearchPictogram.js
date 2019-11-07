import React from 'react'
import {InputGroup, InputGroupAddon, Input, Button, Container, Row} from 'reactstrap';
import {FaSearch} from 'react-icons/fa'

class SearchPictogram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isSearched: false, searchValue: ''}
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.updateSearchValue = this.updateSearchValue.bind(this);
    }
    handleSearchClick() {
        this.setState({isSearched: !this.state.isSearched});
        let listElements = [];
        for (let i = 0; i < this.state.searchValue.length; i++) {
            listElements.push("logo512.png");
        }
        this.props.images(listElements);
    }
    handleSearchKeyPress(e) {
        if (e.key === "Enter") {
            this.handleSearchClick();
        }
    }
    updateSearchValue(e) {
        this.setState({searchValue: e.target.value});
    }
    render() {
        return (
            <Container>
                <Row>
                    <InputGroup>
                        <Input value={this.state.searchValue} onChange={this.updateSearchValue} onKeyPress={this.handleSearchKeyPress} placeholder="search for a pictogram" />
                        <InputGroupAddon addonType="prepend"><Button onClick={this.handleSearchClick} color="primary"><FaSearch/></Button></InputGroupAddon>
                    </InputGroup>
                </Row>
            </Container>
        );
    }
}

export default SearchPictogram;