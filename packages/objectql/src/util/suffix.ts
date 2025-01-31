const validator = require('validator');
//TODO 将此代码转移到license项目
const customObjectNameSuffix = '__c';
const customFieldNameSuffix = '__c';
declare var Steedos: any;

function standardObject(spaceId){
    return validator.toBoolean(process.env.DEVELOPER_STANDARD_OBJECTS || 'false', true) && Steedos.hasFeatureSync('platform_ee.standard_object', spaceId);
}

export const getObjectSuffix = (spaceId: string, internal?: boolean)=>{
    if(internal){
        return customObjectNameSuffix
    }

    if(standardObject(spaceId)){
        return '';
    }
    return customObjectNameSuffix;
}

export const hasObjectSuffix = (objectName: string, spaceId: string, internal?: boolean)=>{
    let suffix = getObjectSuffix(spaceId, internal);
    if(!suffix){
        return false;
    }
    return objectName.endsWith(suffix);
}

export const _makeNewObjectName = (objectName: string, spaceId: string, oldObjectName?: string)=>{
    if(!oldObjectName){
        return `${objectName}${getObjectSuffix(spaceId)}`
    }else{
        if(oldObjectName.endsWith(customObjectNameSuffix)){
            if(!objectName.endsWith(customObjectNameSuffix)){
                return `${objectName}${customObjectNameSuffix}`
            }else{
                return `${objectName}`    
            }
        }else{
            return `${objectName}`
        }
    }
}

export const getFieldSuffix = (spaceId: string, internal?: boolean)=>{
    if(internal){
        return customFieldNameSuffix
    }
    if(standardObject(spaceId)){
        return '';
    }
    return customFieldNameSuffix;
}

export const hasFieldSuffix = (fieldName: string, spaceId: string, internal?: boolean)=>{
    let suffix = getFieldSuffix(spaceId, internal);
    if(!suffix){
        return false;
    }
    return fieldName.endsWith(suffix);
}

export const _makeNewFieldName = (fieldName: string, spaceId: string, oldFieldName?: string)=>{
    if(!oldFieldName){
        return `${fieldName}${getFieldSuffix(spaceId)}`
    }else{
        if(oldFieldName.endsWith(customFieldNameSuffix)){
            if(!fieldName.endsWith(customFieldNameSuffix)){
                return `${fieldName}${customFieldNameSuffix}`
            }else{
                return `${fieldName}` 
            }
        }else{
            return `${fieldName}`
        }
    }
}