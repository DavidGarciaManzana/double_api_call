import React from 'react';
type StatusType = 'idle' | 'loading' | 'success' | 'error' | 'consumed'
interface StatusContextType {
    status: StatusType;
    setStatus: Function;
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