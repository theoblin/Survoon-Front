
import {Buffer} from 'buffer';


export  function decodeCode(encryptedData:string) {
    const parse = Buffer.from(encryptedData, 'base64').toString('ascii')
    return {surveyId:parse.split('#=#')[0],answerCode:parse.split('#=#')[1]};
}

export  function encodeCode(surveyId:number,answerCode:string) {
  const code = (Buffer.from(surveyId+"#=#"+answerCode).toString('base64'))

  return code;
}