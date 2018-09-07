<?php
class User {
    public $user_id; //用户ID
    public $nick; //用户昵称
    public $problems;
    public $mark;
    public $time;
    public $solve_cnt;
    public $ac_cnt;
    
    function __construct() {
        $this->ac_cnt = 0;
        $this->time = 0;
        $this->solve_cnt = 0;
        $this->problems = array();
    }    
}
class Node {
    public $pid;  //题目ID

    public $valid_submit_num; //有效错误数
    public $submit_num; //当前提交数    
    public $time; //当前有效提交时间
    public $pass_rate; //当前提交通过率
    public $result; //当前提交结果（AC，TLE,...）
    public $status; //当前提交状态 （）
    
    // invald  0
    // less partition 1
    // most partition 2
    // AC 3
    public $mark; //当前分数
    function __construct() {
        $this->result = -1;
        $this->status = -1;
        $this->submit_num = 0;
        $this->valid_submit_num = 0;
        $this->time = 0;
        $this->pass_rate = -1;
        $this->mark = 0;
        //TO-DO
    }
    function get_result_short_name() {
        if ($this->result == 4)  return "AC";
        else if ($this->result = 5 ) return "PE";
        else if ($this->result == 6) return "WA";
        return "";
    }
      function __destruct() {

    }
}
abstract class Source {
    protected $cnt;
    // private $records; //代表每个用户的当前状态
    protected $users; //用户索引
    protected $problem_cnt; //题目索引     
    protected $contest_length;
    protected $mark_ratio;    

    function __construct() {
        $this->cnt = 0;
        $this->contest_length = 0;
        $this->users = array();
        // $this->users = array();
    }
    // public abstract function cal_score($record);    
    function get_cnt() {
        return $this->cnt;
    }
    function set_mark_ratio($param1, $param2, $param3) {
        $this->mark_ratio = array($param1, $param2, $param3);
    }
    // 首次获得该用户的信息时执行
    function create_record($user_id, $nick) {
        $this->users[$this->cnt] = new User();
        $this->users[$this->cnt]->user_id = $user_id;    
        $this->users[$this->cnt]->nick = $nick;
        $this->users[$this->cnt]->problems=array();
        for ($i = 0; $i < $this->problem_cnt; $i++) {
        //    $this->users[$this->cnt]-problems[$i] = new Node(); 
            $this->users[$this->cnt]->problems[$i] = new Node();
            $this->users[$this->cnt]->problems[$i]->pid = $i;
        }
        //$this->users[$this->cnt]->problems;
        $this->cnt = $this->cnt + 1;
    }
    function set_problem_cnt($cnt) {
        $this->problem_cnt = $cnt;
    }
    function get_problem_cnt() {
        return $this->problem_cnt;
    }
    function set_contest_length($length) {
        $this->contest_length = $length;
    }
    abstract function update_record($pid, $sec, $res, $threshold, $sim, $ac_rate);
    function __destruct() {
    }
}

class ExperimentSource extends Source{
    private $base_score;
    protected $first_solve_time;
    protected $first_solve_rate;
    function __construct() {
        parent::__construct();
        $this->base_score = 0;
        $this->first_solve_time = array();
        $this->first_solve_rate = array();
    }

    function set_base_score($base_score) {
        $this->base_score = $base_score;
        $time_k = 5 + (40-$this->base_score)/2;
        $time_k/=100;
        $this->set_mark_ratio(0.9 - $time_k, 0.10, $time_k);
    }
    private static function c_cmp($A, $B){
        if ($A->mark != $B->mark)   return $A->mark<$B->mark;
        else if($A->ac_cnt != $B->ac_cnt)return $A->ac_cnt<$B->ac_cnt;
        else if($A->solve_cnt != $B->solve_cnt) return $A->solve_cnt<$B->solve_cnt;
        else{
            return $A->time > $B->time;
        }
    }
    function cal_score($record) {
        $mark = 0;
        if ($record->status < 2) {
            return 0;
        }
        $valid_wa_num = $record->valid_submit_num - 1;
        $contest_length = $this->contest_length;
        if ($contest_length == 0) return 0;
        $pass_rate = $record->pass_rate;

        $mark1 = ($pass_rate * 100) * $this->mark_ratio[0]; //数据通过比率得分，默认占80%
        
        $mark2 = $valid_wa_num * 0.5;
        $mark2 = min($mark2, 100 * $this->mark_ratio[1]);
        $mark2 = 100 * $this->mark_ratio[1] - $mark2;

        $min_pid_time = max(0, $record->time - $this->first_solve_time[$record->pid]);
        
        $mark3 = (1 - $min_pid_time / $contest_length) * $record->pass_rate * ($this->mark_ratio[2]) * 100; 
        
        $mark = $mark1 + $mark2 + $mark3;      

              
        return $mark;
    }

    function get_user_records() {
        foreach ($this->users as $key => $value) {
            foreach ($value->problems as $key_p => $value_p) {
                if ($value->problems[$key_p]->status < 0) continue;
                $mark = $this->cal_score($value->problems[$key_p]);
                $this->users[$key]->time += $this->users[$key]->problems[$key_p]->time;
                if ($this->users[$key]->problems[$key_p]->status >= 2) {
                    if ($this->users[$key]->problems[$key_p]->status == 3) {
                        $this->users[$key]->ac_cnt++;
                    }
                    $this->users[$key]->solve_cnt++;
                }
                $this->users[$key]->mark += $mark;
                $this->users[$key]->problems[$key_p]->mark = $mark;
            }
            if ($this->problem_cnt > 0)
            $this->users[$key]->mark /= $this->problem_cnt;
            else 
            $this->users[$key]->mark = 0;
            if($this->users[$key]->solve_cnt > 0)
                $this->users[$key]->mark = $this->base_score + (100.0 - $this->base_score) /100 * $this->users[$key]->mark;
            else if (count($this->users[$key]->problems) > 0) 
                $this->users[$key]->mark = $this->base_score/2;
        }
        usort($this->users, array('ExperimentSource','c_cmp'));
        return $this->users;
    }
    function update_record($pid, $sec, $res, $threshold, $sim, $ac_rate) {
        if ($sec < 0 || $sec > $this->contest_length) {
            return ;
        }
        $record = &$this->users[$this->cnt - 1]->problems[$pid];
        if(!isset($record)) {
            $record = new Node();
            $record->pid = $pid;
        }
        if($res <= 3 || $res >= 11) {
            if ($record->status <= 0) {
                $record->result = $res;
                $record->pass_rate = 0;
                $record->status = 0;
            }
            return ; //这几种状态跳过
        }
        $record->submit_num++;
        if ($res == 5) {
            $ac_rate = $ac_rate + (1 - $ac_rate) * 0.50001;
            $ac_rate = min($ac_rate, 1);
            //格式错误多加分
        } else if ($res == 4) {
            $ac_rate = 1.0;
        }
        if ($ac_rate > $record->pass_rate) {
            $record->pass_rate = $ac_rate;
            $record->valid_submit_num = $record->submit_num;
            $record->time = $sec;
            $record->result = $res;
            if ($record->pass_rate > 0.5 && $record->pass_rate < 1.0) {
                $record->status = 2;
            } else {
                $record->status = 3;
            }
        }
        if ($record->pass_rate <= 0.5) {
            $record->valid_submit_num = $record->submit_num;
            $record->status = 1;            
        }
        if (!isset($this->first_solve_rate[$pid])) {
            $this->first_solve_time[$pid] = $sec;
            $this->first_solve_rate[$pid] = $record->pass_rate;
        } else {
            //first_solve_rate 
            if($record->pass_rate > $this->first_solve_rate[$pid]){
                $this->first_solve_time[$pid] = $sec;
                $this->first_solve_rate[$pid] = $record->pass_rate;
            } 
            //sec是递增的，故没有以下判断的必要
            /*else if ($record->pass_rate == $this->first_solve_rate[$pid]) {
                $this->first_solve_time[$pid] = min($this->first_solve_time[$pid], $sec);   
            }*/
        }
    }
}
class HomeworkSource  extends Source {
    private $base_score;    
    function __construct() {
        parent::__construct();
        $this->base_score = 0;
    }
    //$k = x / max
    // 100%, x/max <= 10%
    // 90% - 100%, x/max 10% - 80%
    // 90% - 50%, x/max 80% - 100%
    //
    //
    //
    //
    function set_base_score($base_score) {
        $this->base_score = $base_score;
    }

    private static function c_cmp($A, $B){
        if ($A->mark!=$B->mark)   return $A->mark<$B->mark;
        else if($A->ac_cnt!= $B->ac_cnt)return $A->ac_cnt<$B->ac_cnt;
        else if($A->solve_cnt!= $B->solve_cnt) return $A->solve_cnt<$B->solve_cnt;
        else{
            return $A->time > $B->time;
        }
    }
    function T1 ($p_ac_sec1) {
        $k = 1.0 * $p_ac_sec1 / $this->contest_length;
        if($k <= 0.1) return 1.0;
        else if($k <= 0.8) {
            //return 0.9;
            return 1.0 - ($k - 0.1) / 7;
        }
        else{
            return 0.9 - ($k - 0.8)*2;
        }
    }
    function cal_score($record) {
        $mark = 0;
        if ($record->status < 2) return 0;
        $contest_length = $this->contest_length;
        if ($contest_length == 0) return 0;
        $pass_rate = $record->pass_rate;
        $this->set_mark_ratio($this->T1($record->time), 0, 1 - $this->T1($record->time));
        $mark1 = ($pass_rate * 100) * $this->mark_ratio[0];
        $mark3 = (1 - $record->time / $this->contest_length) * $this->mark_ratio[2] * 100;
        $mark = $mark1 + $mark3;
        return $mark;
    }
    function get_user_records() {
        foreach ($this->users as $key => $value) {
            foreach ($value->problems as $key_p => $value_p) {
                $mark = $this->cal_score($value->problems[$key_p]);
                $this->users[$key]->time += $this->users[$key]->problems[$key_p]->time;
                if ($this->users[$key]->problems[$key_p]->status >= 2) {
                    if ($this->users[$key]->problems[$key_p]->status == 3) {
                        $this->users[$key]->ac_cnt++;
                    }
                    $this->users[$key]->solve_cnt++;
                }
                $this->users[$key]->mark += $mark;
                $this->users[$key]->problems[$key_p]->mark = $mark;
            }
            if ($this->problem_cnt > 0)
                $this->users[$key]->mark /= $this->problem_cnt;
            else 
                $this->users[$key]->mark = 0;
            if($this->users[$key]->solve_cnt > 0)
                $this->users[$key]->mark = $this->base_score + (100.0 - $this->base_score) /100 * $this->users[$key]->mark;
            else if (count($this->users[$key]->problems) > 0) 
                $this->users[$key]->mark = $this->base_score/2;
        }
        usort($this->users, array('HomeworkSource','c_cmp'));
        return $this->users;
    }
    function update_record($pid, $sec, $res, $threshold, $sim, $ac_rate) {
        if ($sec < 0 || $sec > $this->contest_length) {
            return ;
        }
        $record = &$this->users[$this->cnt - 1]->problems[$pid];
        if(!isset($record)) {
            $record = new Node();
            $record->pid = $pid;
        }
        if($res <= 3 || $res >= 11) {
            if ($record->status <= 0) {
                $record->result = $res;
                $record->pass_rate = 0;
                 $record->status = 0;
            }
            return ; //这几种状态跳过
        }
        $record->submit_num++;
        if ($res == 5) {
            $ac_rate = $ac_rate + (1 - $ac_rate) * 0.50001;
            $ac_rate = min($ac_rate, 1);
            //格式错误多加分
        } else if ($res == 4) {
            $ac_rate = 1.0;
        }
        if ($ac_rate >= $record->pass_rate) {
            $record->pass_rate = $ac_rate;
            $record->valid_submit_num = $record->submit_num;
            $record->time = $sec;
            if ($record->pass_rate > 0.5 && $record->pass_rate < 1.0) {
                $record->status = 2;
            } else {
                $record->status = 3;
            }  
            $record->result = $res;
        }
        if ($record->pass_rate <= 0.5) {
            $record->valid_submit_num = $record->submit_num;
            $record->status = 1;            
        }
    }
}
class ContestSource  extends Source {
    function __construct() {
        parent::__construct();
    }
    function s_cmp ($A, $B) {
        //  echo "Cmp....<br>";
        if ($A->ac_cnt != $B->ac_cnt)
            return $A->ac_cnt < $B->ac_cnt;
        else
            return $A->time > $B->time;
    }
        
    function get_user_records() {
        foreach ($this->users as $key => $value) {
            foreach ($value->problems as $key_p => $value_p) {
                $time = $this->users[$key]->problems[$key_p]->time;
                if ($time > 0) {
                    $this->users[$key]->time += $time + ($this->users[$key]->problems[$key_p]->valid_submit_num - 1)*1200;                    
                    $this->users[$key]->solve_cnt++;
                    $this->users[$key]->ac_cnt++;                    
                }
                // $this->users[$key]->problems[$key_p]->mark = $this->cal_score($value->problems[$key_p]);
            }
        }
        usort($this->users, array('ContestSource','s_cmp'));        
        return $this->users;
    }
    function update_record($pid, $sec, $res, $threshold, $sim, $ac_rate) {
        if ($sec < 0 || $sec > $this->contest_length) {
            return ;
        }
        $record = &$this->users[$this->cnt - 1]->problems[$pid];
        if(!isset($record)) {
            $record = new Node();
            $record->pid = $pid;
        }
        // if ($res <= 3 || $res >= 11) {
        //     if ($record->status <= 0) {
        //         $record->result = $res;
        //         $record->status = 0;
        //     }
        //     return ; //这几种状态跳过
        // }
        $record->submit_num++;
        if ($record->time > 0)
            return;
        $record->valid_submit_num++;    
        $record->result = $res;
        if ($res!=4 || ($sim > $threshold)){
            $record->status = 1;
        }else{
            $record->time=$sec;
            $record->status = 3;            
                // $record->time+=$sec+$this->p_wa_num[$pid]*1200;
        }
    }
}
?>
