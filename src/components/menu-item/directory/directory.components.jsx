import React from "react";
import MenuItem from "../menu-items/menu-item.component";
import './directory.styles.css';
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../../../redux/directory/directory.selectors";
import { connect } from "react-redux";

    const Directory = ({sections}) => (
      <div className = 'directory-menu'>
          {sections.map(({id, ...otherSectionProps}) => (
                  <MenuItem key = {id} {...otherSectionProps} />
              ))}
      </div>
  );

  const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
  });

export default connect(mapStateToProps)(Directory);