const connection = require('../database/connection');

module.exports ={
    async index(request,response){
      const{page = 1,pageSize =5} = request.query;

      const [countTotal] =  await connection('incidents').count();
      
      console.log(countTotal);

      const incidents = await connection('incidents')
      .join('ongs','ongs.id','=','incidents.ong_id')
      .limit(pageSize)
      .offset((page-1)*pageSize)
      .select(['incidents.*',
      'ongs.name',
      'ongs.email',
      'ongs.email',
        'ongs.city',
        'ongs.uf']);

      response.header('X-Total-Count',countTotal['count(*)'])

      return response.json(incidents);
    },
    async create(request,response){
        const{title,description,value} = request.body;
        const ong_id = request.headers.authorization; // no request.headers geralmente estão os dados do usuario, localizacao, etc..
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })
        return response.json({id});
    },
    async delete(request,response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident =  await (connection('incidents')
        .where('id',id)
        .select('ong_id'))
        .first();

        if(incident.ong_id != ong_id){
            return response.status(401).json({error:'Operation not permited.'});
        }

        await connection('incidents')
        .where('id',id)
        .delete();

        return response.status(204).send();
    }
}