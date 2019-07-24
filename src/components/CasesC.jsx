import React from 'react';
import {Link} from 'gatsby';

class Cases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cases: this.props.cases,
            filter: this.props.filter,

        };
        console.log(this.props)
    }

    componentWillReceiveProps(nextProps, prevState) {
        console.log(nextProps, 'nextProps');
        if (this.state.filter !== undefined && nextProps.filter !== prevState.filter ) {
            this.setState({
                filter: nextProps.filter,
                cases: nextProps.cases,
            });
            return this.filter()

        }
        return null
    }

    filter = () =>{

        console.log(this.state.filter, 'filter');
        if ( this.state.filter !== 'All') {
            let filteredCases = [];
            this.state.cases.forEach(e2 => {
                if (this.state.filter === e2.sections.name) {
                    filteredCases.push(e2)
                }

            });
            this.setState({
                filtered: filteredCases
            })
        } else {
            this.setState({
                filtered: this.props.cases
            })
        }

    };

    render() {
        console.log(this.state, 'state from cases');
        return (
            <div className="cases">
                {this.state.filtered === undefined  ? this.state.cases.map((wpCase, index) => (
                    <Link to={wpCase.path} key={index}>
                        <img src={wpCase.thumbnail_image.url}/>
                        <div className="cases-card">
                            <span>{wpCase.title}</span>
                            <span>{wpCase.technologies.name}</span>
                            <span>{wpCase.sections.name}</span>
                        </div>
                    </Link>
                )) : this.state.filtered.map((wpCase, index) => (
                    <Link to={wpCase.path} key={index}>
                        <img src={wpCase.thumbnail_image.url}/>
                        <div className="cases-card">
                            <span>{wpCase.title}</span>
                            <span>{wpCase.technologies.name}</span>
                            <span>{wpCase.sections.name}</span>
                        </div>
                    </Link>
                ))
                }

            </div>
        )
    }
}

export default Cases
