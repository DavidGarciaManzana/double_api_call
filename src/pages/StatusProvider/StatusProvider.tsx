import React from 'react';
type StatusType = 'idle' | 'loading' | 'success' | 'error'
interface StatusContextType {
    status: StatusType;
    setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
}
export const StatusContext = React.createContext<StatusContextType>({} as StatusContextType);

function StatusProvider({children}: { children: React.ReactNode }) {
    const [status, setStatus] = React.useState<StatusType>('idle');



    return (
        <StatusContext.Provider value={{status,setStatus}}>
            {children}
        </StatusContext.Provider>
    )
}

export default StatusProvider