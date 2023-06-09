import React from 'react';
import Item from './Item';
const ItemList = ({task, handleUpdate, handleItemToggle, handleDeleteOne, detailModel, setDetailModel, setSelectedItem, setItemOpt,itemOpt, toggleIdx, show, start}) =>{
    return (<>
        { 
            show===true && 
            <div style={{zIndex:'0'}}>
                {
                    task.map((data, idx)=>{
                        var theme = "none";
                        var remainingElements = task.length%9;
                        var isLastChunkSingleElement = remainingElements<=1 && (task.length-start)<=1;
                        if(idx-start<9 && idx-start>=0)
                        {
                            if(idx-start===0){
                                theme = "top-item-theme"
                            }
                            else{
                                if(idx-start===8 || task.length-start-(idx-start)===1){
                                    theme = "bottom-item-theme"
                                }else if(idx-start>0){
                                    theme = "mid-item-theme"
                                }
                            }
                            if(isLastChunkSingleElement){
                                theme = "single-item-theme";
                            }
                            return (
                                <>
                                    <Item data={data} handleUpdate={handleUpdate} idx={idx} handleItemToggle={handleItemToggle} handleDeleteOne={handleDeleteOne} detailModel={detailModel} setDetailModel={setDetailModel} setSelectedItem={setSelectedItem} setItemOpt={setItemOpt} itemOpt={itemOpt} toggleIdx={toggleIdx} theme={theme}/>
                                </>
                            )
                        }
                    })
                }
                </div>
        }
    </>)
}
export default ItemList;