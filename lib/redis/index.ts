import redisConfig from "./config"


export const isKeyExists = async (key: string) => {
    if (!redisConfig.redisEnabled) {
        return false
    }
    const exists = await redisConfig.redis!.exists(key)
    return exists === 1
}

export const setKey = async (key: string, value: string, ttlSeconds?: number) => {
    if (!redisConfig.redisEnabled) {
        return
    }
    await redisConfig.redis!.set(key, value, "EX", ttlSeconds || redisConfig.defaultTTLSeconds)

}

export const getKey = async (key: string): Promise<string | null> => {
    if (!redisConfig.redisEnabled) {
        return null
    }
    const value = await redisConfig.redis!.get(key)
    return value
}

export const deleteKey = async (key: string) => {
    if (!redisConfig.redisEnabled) {
        return
    }
    await redisConfig.redis!.del(key)
}

export const flushAll = async () => {
    if (!redisConfig.redisEnabled) {
        return
    }
    await redisConfig.redis!.flushall()
}

export const deleteKeysByPattern = async (pattern: string) => {
    if (!redisConfig.redisEnabled) {
        return
    }
    const redis = redisConfig.redis!
    let cursor = '0'
    do {
        // Use SCAN to find keys matching the pattern in batches
        const [newCursor, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100) 
        cursor = newCursor
        if (keys.length > 0) {
            await redis.del(...keys)
        }
    } while (cursor !== '0')
}

export const invalidatePlantCaches = async () => {
    if (!redisConfig.redisEnabled) {
        return
    }
    await deleteKeysByPattern('plants_*')
}

export const invalidatePlantDiseasesCaches = async (plantId: string) => {
    if (!redisConfig.redisEnabled) {
        return
    }
    await deleteKeysByPattern(`plant_${plantId}_*`)
}

export const invalidateDiseaseDocCaches = async (diseaseDocId?: string, diseaseId?: string) => {
    if (!redisConfig.redisEnabled) {
        return
    }
    if (diseaseDocId) {
        await deleteKey(`disease_doc_${diseaseDocId}`)
    }
    if (diseaseId) {
        await deleteKey(`disease_doc_by_disease_${diseaseId}`)
    }
}

export const getRedisClient = () => {
    return redisConfig.redis
}

export const isRedisEnabled = () => {
    return redisConfig.redisEnabled
}

export const redisKeys = redisConfig.redisKeys