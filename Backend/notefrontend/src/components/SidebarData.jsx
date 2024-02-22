import React from 'react';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ArchiveIcon from '@mui/icons-material/Archive';


export const SidebarData = [
    {
        title:'Notes',
        path:'/notes',
        icon:<TextSnippetIcon/>,
        cName:'nav-text'
    },
    {
        title:'Archives',
        path:'archives',
        icon:<ArchiveIcon/>,
        cName:'nav-text'
    }
]