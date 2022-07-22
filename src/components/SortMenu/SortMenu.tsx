import React, {FC} from 'react';
import {Button, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {ArrowDownIcon} from "@chakra-ui/icons";
import {useAppDispatch} from "../../redux";
import {setSorting, Sort, StatusSorting, TypeSorting} from "../../redux/userReducer";


interface Props {
    label: string,
    sortingType: keyof Sort
    menuItems: typeof StatusSorting | typeof TypeSorting
}

//Sort Menu providing sorting interface and dispatching current sort status to store

const SortMenu: FC<Props> = ({label, menuItems, sortingType}) => {
    const dispatch = useAppDispatch()
    const labels = Object.keys(menuItems) as Array<keyof typeof menuItems>
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<ArrowDownIcon/>}>
                {label}
            </MenuButton>
            <MenuList>
                {
                    labels.map((item, index) =>
                        <MenuItem
                            key={index}
                            onClick={() => dispatch(setSorting({
                                [sortingType]: menuItems[item]
                            }))}
                        >{item}</MenuItem>)
                }
            </MenuList>
        </Menu>
    );
};

export default SortMenu;