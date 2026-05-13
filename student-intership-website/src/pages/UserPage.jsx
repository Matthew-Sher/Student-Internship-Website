import { useEffect, useState } from "react";
import { getProfileData } from "../entities/user/api";
import { Header } from "../shared/layout/Header/Header";
import { EmployerAcc } from "../features/employer/EmployerAcc";
import { StudentAcc } from "../features/student/StudentAcc";

export const UserPage = () => {
    const [userData, setUserData] = useState({});

    async function loadUser() {
        let resp = await getProfileData();
        let data = await resp.json();
        setUserData(data);
    }

    useEffect(() => {
        loadUser();
    }, []);
    
    let role = '';
    if (userData.role) {
        role = userData.role[0].name;
    }

    return (
        <div>
            <Header />
            {role === 'ROLE_EMPLOYER'?
                <EmployerAcc 
                    userData={userData}
                    reloadUser={loadUser}
                />
            : <StudentAcc 
                userData={userData}
                reloadUser={loadUser}
            />}
        </div>
    );
}