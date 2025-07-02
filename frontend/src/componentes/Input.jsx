import React from "react";
import PropTypes from "prop-types";
import "./Input.css"; // Asegúrate de tener este archivo CSS

const Input = ({ type,name, value, onChange, id, error }) => {
    return(
     <div className="form-group">
                    <label htmlFor={id}>{name}</label>
                    <input
                        className='perfume-input'
                        type={type}
                        id={id}
                        value={value}
                        onChange={onChange}
                        required
                    />
                    {error && <span className='field-error'>{error}</span>}
                </div>)

};
export default Input;