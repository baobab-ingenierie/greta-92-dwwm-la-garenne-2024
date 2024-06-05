-- Version en cours
show variables like 'version'
;

-- Test qui on est
select current_user()
;

-- Lister les users
select host, user, password 
from mysql.user
;

select host, user, password 
from mysql.user \G 

-- Change le mot de passe de ROOT
alter user 'root'@'localhost' 
identified by 'secret'
;

-- Crée un nouveau user
create user 'bruce'@'localhost' 
identified by 'power'
;

-- Donne tous les privilèges à BRUCE
grant all privileges 
on *.* 
to 'bruce'@'localhost'
;

grant all privileges 
on *.* 
to 'bruce'@'localhost'
with grant option
;

-- Affiche les privilèges
show grants;
show grants for 'bruce'@'localhost';

-- Verrouille le compte de root
alter user 'root'@'localhost' 
account lock
;

-- Crée une nouvelle BDD
create database test_db;
show databases;
use test_db;
create table table1(col1 char, col2 int);
create table table2(col1 char, col2 int);
create table table3(col1 char, col2 int);
show tables;

-- Crée un nouveau user
create user 'emma'@'localhost' 
identified by 'secret'
;

grant select 
on test_db.table1 
to 'emma'@'localhost'
;

grant insert, update, delete 
on test_db.table2 
to 'emma'@'localhost'
;

flush privileges;

-- En tant qu'EMMA
select * from test_db.table1;
--Empty set (0.001 sec)

select * from test_db.table2;
--ERROR 1142 (42000): SELECT command denied to user 'emma'@'localhost' for table `test_db`.`table2`

select * from test_db.table3;
--ERROR 1142 (42000): SELECT command denied to user 'emma'@'localhost' for table `test_db`.`table3`
