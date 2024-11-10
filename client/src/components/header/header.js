import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './header.css';
import routes from '../../routes'
import Navigation from '../navigation/navigation'

const Header = ({userId, isSidebarVisible, toggleSidebar}) => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHeaderInfo = async () => {
            try {
                const response = await axios.post('/userprogress', {
                    userid: userId
                }).then(res => setUserInfo(res.data));
                
                
            } catch (err) {
                console.error('Error fetching header info:', err);
                setError('Could not load header information');
            }
        };
        fetchHeaderInfo();
    }, [userId]); // Empty dependency array to ensure it runs only once

    const calculateProgress = (data) => {
        console.log(data);
        //data has each section set count + user total completion
        var lessonCnt = 0;
        var lessons = [0,0,0,0,0];
        data.lesson_counts.forEach(function (item, index) {
            lessonCnt += item.type_count;
            lessons[index] = item.type_count;
        });
        const totalSets = data.vocab_count + data.read_count + data.sent_count + data.tense_count + 2 + lessonCnt;
        var progress = 0;
        if(totalSets != 0)
            progress = Math.round((data.set_completion / totalSets) * 100);

        routes[1].completed_sets = data.alpha_cnt;
        routes[2].completed_sets = data.vocab_cnt;
        routes[3].completed_sets = data.sent_cnt;
        routes[4].completed_sets = data.tense_cnt;
        routes[5].completed_sets = data.read_cnt;

        routes[1].total_sets = 2 + lessons[0];
        routes[2].total_sets = data.vocab_count + lessons[1];
        routes[3].total_sets = data.sent_count + lessons[2];
        routes[4].total_sets = data.tense_count + lessons[3];
        routes[5].total_sets = data.read_count + lessons[4];

        return (
            <div className="head-progress" style={{height: '30px'}}>
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                <div className="progress-text">
                    {progress}%
                </div>
            </div>
        );
    }
    
    return(
        <header className={`header ${isSidebarVisible ? 'expanded' : 'collapsed'} `}>
            {userInfo ? (
                <div className="side-contianer">
                    <div className="head-welcome">
                    <div className="head-info">
                        <img src={`/images/user1.png`} alt="User icon" className="head-image" />
                        <h1 className="head-name" hidden={!isSidebarVisible}>{userInfo.username}</h1>
                    </div>
                    <div className="head-progress-bar-container">
                        {calculateProgress(userInfo)}
                    </div>
                    </div>
                    <div className="sidebar">
                        <Navigation isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar}/>
                    </div>
                </div>
            ) : (
                <p>loading...</p>
            )}
        </header>
    );
};

export default Header;