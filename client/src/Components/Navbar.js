import React, { useState } from 'react';
import { IoHome, IoSearchSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { MdLogout } from 'react-icons/md';
import '../Styles/Navbar.css'

const suggestions = [
    'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 
    'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 
    'Krishnagiri', 'Madurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 
    'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivagangai', 'Tenkasi', 
    'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupattur', 
    'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 
    'Virudhunagar'
];


export default function Navbar() {
    const navigate = useNavigate();
    const [location, setLocation] = useState('');
    const [suggestedLocations, setSuggestedLocations] = useState([]);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleSearch = () => {
        navigate(`/searchResults?location=${encodeURIComponent(location)}`);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        } else {
            const inputText = event.target.value.toLowerCase();
            const filteredSuggestions = suggestions.filter((suggest) =>
                suggest.toLowerCase().startsWith(inputText)
            );
            setSuggestedLocations(filteredSuggestions);
        }
    };

    const handleLocationClick = (location) => {
        setLocation(location);
        setSuggestedLocations([]);
    };

    const handleLogout = () => {};
    // const isLoggedIn = !!localStorage.getItem('userId');
    const isLoggedIn = false;

    return (
        <div className="header">
            <div className="icon">
                <Link to='/'><IoHome size={50}/></Link>
                <span>Rentify</span>
            </div>
            <div className="navbar">
                <div className="search-bar">
                    <input type="search" placeholder="Search By Location" className="search-input" value={location} onChange={(e) => setLocation(e.target.value)} onKeyPress={handleKeyPress}/>
                    <IoSearchSharp size={20} color="grey" className="search-icon" onClick={handleSearch} />
                </div>
                {suggestedLocations.length > 0 && (
                    <div className="suggestions-container">
                        {suggestedLocations.map((location, index) => (
                            <div
                                key={index}
                                className="suggestion-item"
                                onClick={() => handleLocationClick(location)}
                            >
                                {location}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="user-properties">
                <div className='wishlist'>
                    <Link to='/wishlist'><CiHeart size={40} color='#e56b6f'/></Link>
                </div>
                <div className='cart'>
                    <Link to='/cart'><FaShoppingCart size={30} color='black'/></Link>
                </div>
                {isLoggedIn ? (
                    <div className='profile'>
                        <IoPersonCircleSharp size={40} onClick={toggleProfileDropdown} />
                        {isProfileDropdownOpen && (
                            <div className='profile-dropdown'>
                                <Link to='/profile' className='nav-link-details'>
                                    Profile<CgProfile size={25}/>
                                </Link>
                                <div className='divider'></div>
                                <div className='nav-link-details' onClick={handleLogout}>
                                    Logout<MdLogout size={25}/>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='loginbutton'>
                        <Link to='/loginregister' className='nav-link'>
                            <button className='login'>LOGIN</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
