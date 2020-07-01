import {Table, Column, Model, HasMany, PrimaryKey, CreatedAt, NotNull} from 'sequelize-typescript';
import {Col} from "sequelize/types/lib/utils";
import {DateOnlyDataType} from "sequelize";

@Table
export class PersonalDiary extends Model<PersonalDiary> {
  
  /*@PrimaryKey
  @Column
  public id!: number;*/

  @Column
  public recordDate!: string; // for nullable fields

  @Column
  public notes!: string;

  @Column
  public email!: string;

  @Column
  @CreatedAt
  public createdAt: Date = new Date();

  short() {
    return {
      id: this.id,
      email: this.email
    }
  }
}
