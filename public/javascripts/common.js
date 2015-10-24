function form_field_value(form, name){
    var $form = $(form);
    var $ret;
    $ret = $form.find('input[name="'+name+'"]');
    if($ret && $ret.length > 0){
        return $ret.first().val();
    }
    $ret = $form.find('textarea[name="'+name+'"]');
    if($ret && $ret.length > 0){
        return $ret.first().val();
    }
    $ret = $form.find('select[name="'+name+'"]');
    if($ret && $ret.length > 0){
        return $ret.first().val();
    }
    return '';
}
function form_check(val){
    if(val.length == 0){
        return '不能为空';
    }
}
function form_check_string(val){
    var len = arguments[1] ? arguments[1] : 255;
    if(val.length == 0){
        return '不能为空';
    }
    if(val.length > len){
        return '长度不能超过'+len;
    }
    return false;
}
function confirm_delete(){
    if(confirm('确认删除？')){
        return true;
    }
    return false;
}