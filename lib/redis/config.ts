import Redis from 'ioredis'
const redisConfig = {
    redis: null as Redis | null,
    redisEnabled: false,
    defaultTTLSeconds: parseInt(process.env.REDIS_DEFAULT_TTL_SECONDS || '3600', 10),
    redisKeys: {
        plantsCount: (query?: string) => `plants_count_${query || 'all'}`,
        plantDiseasesCount: (plantId: string, query?: string) => `plant_${plantId}_diseases_count_${query || 'all'}`,
        allPlants: (query?: string, page: number = 1, limit: number = 10) => `plants_${query || 'all'}_page_${page}_limit_${limit}`,
        plantDiseases: (plantId: string, query?: string, page: number = 1, limit: number = 10) => `plant_${plantId}_diseases_${query || 'all'}_page_${page}_limit_${limit}`,
        diseaseDoc: (diseaseDocId: string) => `disease_doc_${diseaseDocId}`,
        diseaseDocByDiseaseId: (diseaseId: string) => `disease_doc_by_disease_${diseaseId}`
    }
};

if(process.env.REDIS_HOST) {
    const redisClient = new Redis({
        host:      process.env.REDIS_HOST,
        port:      parseInt(process.env.REDIS_PORT || '6379', 10),
        password:  process.env.REDIS_PASSWORD,
        username:  process.env.REDIS_USERNAME,
    });
    redisConfig.redis = redisClient;
    redisConfig.redisEnabled = true;
}


export default redisConfig;